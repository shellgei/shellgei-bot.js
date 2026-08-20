import * as path from 'path';
import commandShellScript from './utils/commandShellScript';
import {spawnAsync} from './utils/spawnAsync';
import {createImage, deleteImage} from './utils/createImage';

const ymlPath = path.relative(path.resolve(), path.join(__dirname, 'docker-compose.yml'))
const tmpShellScriptPath = '/tmp/shellgei.sh'
const containerImgPath = '/app/data/ext4.img'

const execShellgei = async (command: string) => {
  const shellScriptPath = commandShellScript.createFile({command});
  const imgPath = await createImage().catch((error) => {
    throw error?.stack ?? error?.message ?? error ?? 'createImage error';
  });

  try {
    const args = ['compose', '-f', ymlPath, '--progress', 'quiet', 'run', `--volume=${imgPath}:${containerImgPath}`, `--volume=${shellScriptPath}:${tmpShellScriptPath}`, '--rm', '--remove-orphans', 'shell-gei', 'bash', tmpShellScriptPath];
    // logger.log("docker", ...args);

    return await spawnAsync('docker', args, {
      cwd: path.resolve()
    }).catch((error) => error?.stack ?? error?.message ?? error)
  } finally {
    await commandShellScript.deleteFile(shellScriptPath);
    await deleteImage(imgPath);
  }
}

export {execShellgei}