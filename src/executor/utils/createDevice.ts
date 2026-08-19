import {$} from 'zx';
import logger from '../../logger';
import {existsSync} from 'node:fs';

const uid = process.getuid?.();
const gid = process.getgid?.();

const IMG_SIZE = 10;

const createVirtualDevice = async (imgPath: string, mountPath: string) => {
  await $`dd if=/dev/zero of=${imgPath} bs=1M count=${IMG_SIZE} status=none`

  const losetupResult = await $`sudo losetup -f --show ${imgPath}`
  const devicePath = losetupResult.stdout.trim();

  await $`sudo mkfs.ext4 -E root_owner=${uid}:${gid} ${devicePath}`.quiet();

  await $`sudo mount -o loop ${imgPath} ${mountPath}`;

  return devicePath;
}

const createDevice = async () => {
  const result1 = await $`mktemp --suffix=.img`;
  const imgPath = result1.stdout.trim();
  const result2 = await $`mktemp -d`;
  const mountPath = result2.stdout.trim();

  let devicePath = undefined

  try {
    devicePath = await createVirtualDevice(imgPath, mountPath);
  } catch (err: any) {
    logger.error(err?.stack ?? err?.message ?? err ?? 'createDevice error')
    deleteDevice({imgPath, devicePath, mountPath})
  }

  return {imgPath, devicePath, mountPath};
}


const deleteDevice = async ({mountPath, imgPath, devicePath}: {
  mountPath: string,
  imgPath: string,
  devicePath?: string
}) => {
  // console.log("Starting cleanup...");

  // 2. マウントされているか確認してからアンマウント
  const mountCheck = await $`mountpoint -q ${mountPath}`.nothrow();
  if (mountCheck.exitCode === 0) {
    // console.log(`Unmounting: ${mountPath}`);
    await $`sudo umount ${mountPath}`;
  }

  // 3. 仮想ディスクに紐づいているloop deviceを解除
  if (devicePath && existsSync(devicePath)) {
    // console.log(`Detaching: ${devicePath}`);
    await $`sudo losetup -d ${devicePath}`;
  }

  // 4. 仮想ディスクイメージを削除
  if (existsSync(imgPath)) {
    // console.log(`Removing virtual disk image: ${imgPath}`);
    await $`rm -f ${imgPath}`;
  }

  // 5. マウントポイントを削除
  if (existsSync(mountPath)) {
    // console.log(`Removing mount directory: ${mountPath}`);
    await $`rmdir ${mountPath}`;
  }

  // console.log("Cleanup completed successfully.");
}


export {createDevice, deleteDevice}