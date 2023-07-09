import logger from '../logger';

type Worker = (workerData: any) => Promise<any | void | unknown>

const workerWrapper = (worker: Worker, workerData: any) =>
  worker(workerData)
    .then(() => logger.log(`${worker?.name} is finished`))
    .catch((err) => logger.error(`${worker?.name} is failed`, err?.stack ?? err?.message ?? err ?? 'workerWrapper error'))

export {workerWrapper}