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

// missKey
const MISS_KEY_HOST: Readonly<string> = process.env.MISS_KEY_HOST ?? '';
const MISS_KEY_MENTION_SECRET: Readonly<string> = process.env.MISS_KEY_MENTION_SECRET ?? '';
const MISS_KEY_CREATE_NOTE_API_KEY: Readonly<string> = process.env.MISS_KEY_CREATE_NOTE_API_KEY ?? '';
const MISS_KEY_REACTION_API_KEY: Readonly<string> = process.env.MISS_KEY_REACTION_API_KEY ?? '';
const MISS_KEY_BOT_USER_ID: Readonly<string> = process.env.MISS_KEY_BOT_USER_ID ?? '';
const MISS_KEY_BOT_NAME = process.env.MISS_KEY_BOT_NAME ?? '@sh';
const MISS_KEY_BOT_EXTERNAL_NAME = process.env.MISS_KEY_BOT_EXTERNAL_NAME ?? '@sh@mi.shellgei.org';


export {
  DEV_MODE,
  PORT,
  PING_MSG,
  MISS_KEY_HOST,
  MISS_KEY_MENTION_SECRET,
  MISS_KEY_CREATE_NOTE_API_KEY,
  MISS_KEY_BOT_USER_ID,
  MISS_KEY_REACTION_API_KEY,
  MISS_KEY_BOT_NAME,
  MISS_KEY_BOT_EXTERNAL_NAME
}