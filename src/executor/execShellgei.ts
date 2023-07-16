import * as path from 'path';
import {execSync} from 'child_process';
import commandShellScript from './utils/commandShellScript';

const ymlPath = path.relative(path.resolve(), path.join(__dirname, 'docker-compose.yml'))
const tmpShellScriptPath = '/tmp/shellgei.sh'

const execShellgei = (command: string) => {
  const shellScriptPath = commandShellScript.createFile({command});

  const execCommand = `docker compose -f ${ymlPath} run --volumes=${shellScriptPath}:${tmpShellScriptPath} --rm --remove-orphans shell-gei sh ${tmpShellScriptPath}`;
  console.log(execCommand)

  const result = execSync(execCommand, {
    encoding: 'utf-8',
    cwd: path.resolve()
  })

  commandShellScript.deleteFile(shellScriptPath);

  return result
}

export {execShellgei}