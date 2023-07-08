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


export {PORT, PING_MSG}