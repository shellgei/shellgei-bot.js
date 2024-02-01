import {spawn, SpawnOptionsWithoutStdio} from 'child_process';
import kill from 'tree-kill';

type SpawnAsync = (command: string, args: ReadonlyArray<string>, options: SpawnOptionsWithoutStdio) => Promise<string>

const spawnAsync: SpawnAsync = (command, args, options = {}) => {
  return new Promise((resolve, reject) => {
    const s = spawn(command, args, options);

    const forceKill = setTimeout(() => {
      s.stdout.pause();
      s.stderr.pause();
      kill(s.pid!!, 'SIGKILL');
    }, options.timeout ?? 10 * 1000)

    s.stdout.on('data', (data) => resolve(`${data}`))
    s.stderr.on('data', (data) => reject(`${data}`))
    s.on('error', (error) => reject(`${error?.stack ?? error?.message ?? error}`))
    s.on('close', (code) => {
      clearTimeout(forceKill);
    })
  })
}

export {spawnAsync}