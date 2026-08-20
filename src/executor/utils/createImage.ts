import {$} from 'zx';
import fs from 'node:fs/promises';

const IMG_SIZE = 10;

const createImage = async (): Promise<string> => {
  const imgPath = (await $`mktemp --suffix=.img`).stdout.trim();
  await $`truncate -s ${IMG_SIZE}M ${imgPath}`;
  await $`mkfs.ext4 -q -F -b 4096 ${imgPath}`.quiet();
  return imgPath;
}

const deleteImage = (imgPath: string) => fs.rm(imgPath, {force: true})

export {createImage, deleteImage}
