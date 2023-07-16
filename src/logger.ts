const createMsg = (...msg: any[]) => {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `[${year}/${month}/${day}:${hours}:${minutes}:${seconds}]${msg.join(' ')}\n`;
};


const log = (...msg: any[]) => {
  const message = createMsg(...msg)
  console.log(message)
}
const error = (...msg: any[]) => {
  const message = `[Error]${createMsg(...msg)}`
  console.error(message)
}

const logger = {
  log, error
}

export default logger