import * as path from 'path'
import 'dotenv/config'

const Num = (num: any) => {
  const n = Number(num)
  if (Number.isNaN(n)) {
    return null
  }
  return n;
}

const DEV_MODE: Readonly<boolean> = process.env.NODE_ENV === 'development';

const PORT: Readonly<number> = Num(process.env.PORT) ?? 23344;
const PING_MSG: Readonly<string> = process.env.PING_MSG ?? 'Hello World!!!!!';
const LOG_PATH: Readonly<string> = process.env.LOG_PATH ?? path.join(__dirname, '../log/shellgeiBot.log');

// missKey
const MISS_KEY_HOST: Readonly<string> = process.env.MISS_KEY_HOST ?? '';
const MISS_KEY_MENTION_SECRET: Readonly<string> = process.env.MISS_KEY_MENTION_SECRET ?? '';
const MISS_KEY_CREATE_NOTE_API_KEY: Readonly<string> = process.env.MISS_KEY_CREATE_NOTE_API_KEY ?? '';
const MISS_KEY_REACTION_API_KEY: Readonly<string> = process.env.MISS_KEY_REACTION_API_KEY ?? '';
const MISS_KEY_BOT_USER_ID: Readonly<string> = process.env.MISS_KEY_BOT_USER_ID ?? '';

export {
  DEV_MODE,
  PORT,
  PING_MSG,
  LOG_PATH,
  MISS_KEY_HOST,
  MISS_KEY_MENTION_SECRET,
  MISS_KEY_CREATE_NOTE_API_KEY,
  MISS_KEY_BOT_USER_ID,
  MISS_KEY_REACTION_API_KEY
}