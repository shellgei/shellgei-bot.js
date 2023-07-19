import * as path from 'path';
import commandShellScript from './utils/commandShellScript';
import {spawnAsync} from './utils/spawnAsync';

const ymlPath = path.relative(path.resolve(), path.join(__dirname, 'docker-compose.yml'))
const tmpShellScriptPath = '/tmp/shellgei.sh'

const execShellgei = async (command: string) => {
  const shellScriptPath = commandShellScript.createFile({command});

  const args = ['compose', '-f', ymlPath, 'run', `--volumes=${shellScriptPath}:${tmpShellScriptPath}`, '--rm', '--remove-orphans', 'shell-gei', 'bash', tmpShellScriptPath];
  // logger.log("docker", ...args);

  const result = await spawnAsync('docker', args, {
    cwd: path.resolve()
  }).catch((error) => error?.stack ?? error?.message ?? error)


  commandShellScript.deleteFile(shellScriptPath);

  return result
}

export {execShellgei}