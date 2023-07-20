import {Request, Response} from 'express';
import {Worker} from 'worker_threads';
import {getMissKeyWorkerPath} from '../utils/getMissKeyWorkerPath';
import {getMissKeyHookId, getMissKeyHookSecret} from '../utils/getMissKeyHeader';
import logger from '../../../logger';
import {existNoteId, setNoteIds} from '../utils/renoteIdCollection';


const mention = async (req: Request, res: Response) => {
  // logger.log(JSON.stringify(req?.body, null, 2))

  const secret = getMissKeyHookSecret(req?.headers);
  const hookId = getMissKeyHookId(req?.headers);
  const {eventId, type} = req?.body;
  const renoteId = req?.body?.body?.note?.id;
  const text = req?.body?.body?.note?.text;
  const userId = req?.body?.body?.note?.userId;
  const renoteCount = req?.body?.body?.note?.renoteCount;
  // logger.log(JSON.stringify({secret, hookId, eventId, type, renoteId, text, userId},null,2))

  if (existNoteId(renoteId)) {
    logger.log('exist noteId', renoteId);
    return;
  } else {
    setNoteIds(renoteId);
  }

  // シェル芸を実行して結果を返す
  new Worker(getMissKeyWorkerPath('mention'), {
    workerData: {
      secret, hookId, eventId, type, renoteId, text, userId
    }
  })

  return res.status(200).end();
}

export {mention}