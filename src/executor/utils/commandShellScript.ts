import {spawnSync} from 'child_process';
import * as fs from 'fs';
import * as fsPromise from 'fs/promises';

interface Args {
  command: string
}

const createFile = ({command}: Args) => {
  const {stdout, error, stderr} = spawnSync('mktemp', {encoding: 'utf-8'});
  const err = error?.stack || stderr;
  if (err) {
    throw new Error(err);
  }
  const filePath = stdout.trim();

  fs.writeFileSync(filePath, command, {encoding: 'utf-8'});

  return filePath
}

const deleteFile = (filePath: string) => fsPromise.rm(filePath)

const commandShellScript = {
  createFile, deleteFile
}

export default commandShellScript
