import * as path from 'path';
import commandShellScript from './utils/commandShellScript';
import {spawnAsync} from './utils/spawnAsync';
import {createDevice, deleteDevice} from './utils/createDevice';

const ymlPath = path.relative(path.resolve(), path.join(__dirname, 'docker-compose.yml'))
const tmpShellScriptPath = '/tmp/shellgei.sh'

const execShellgei = async (command: string) => {
  const shellScriptPath = commandShellScript.createFile({command});

  const devicePaths = await createDevice();
  const {mountPath} = devicePaths;

  const args = ['compose', '-f', ymlPath, '--progress', 'quiet', 'run', `--volumes=${mountPath}:/app/data`, `--volumes=${shellScriptPath}:${tmpShellScriptPath}`, '--rm', '--remove-orphans', 'shell-gei', 'bash', tmpShellScriptPath];
  // logger.log("docker", ...args);

  return await spawnAsync('docker', args, {
    cwd: path.resolve()
  }).catch((error) => error?.stack ?? error?.message ?? error).finally(() => {
    commandShellScript.deleteFile(shellScriptPath);
    deleteDevice(devicePaths)
  })
}

export {execShellgei}