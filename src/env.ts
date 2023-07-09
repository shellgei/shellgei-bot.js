import * as path from 'path'
import 'dotenv/config'

const Num = (num: any) => {
  const n = Number(num)
  if (Number.isNaN(n)) {
    return null
  }
  return n;
}

const PORT: Readonly<number> = Num(process.env.PORT) ?? 23344;
const PING_MSG: Readonly<string> = process.env.PING_MSG ?? 'Hello World!!!!!';

const ACCESS_LOG_PATH = process.env.ACCESS_LOG_PATH ?? path.join(__dirname, 'log', 'access.log');

export {PORT, PING_MSG, ACCESS_LOG_PATH}