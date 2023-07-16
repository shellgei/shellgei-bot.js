import {spawn, SpawnOptionsWithoutStdio} from 'child_process';

type SpawnAsync = (command: string, args: ReadonlyArray<string>, options: SpawnOptionsWithoutStdio) => Promise<string>

const spawnAsync: SpawnAsync = (command, args, options = {}) => {
  return new Promise((resolve, reject) => {
    const s = spawn(command, args, options);
    s.stdout.on('data', (data) => resolve(`${data}`))
    s.stderr.on('data', (data) => reject(`${data}`))
    s.on('error', (error) => reject(`${error?.stack ?? error?.message ?? error}`))
  })
}

export {spawnAsync}