import {Request, Response} from 'express';
import {Worker} from 'worker_threads';
import {getMissKeyWorkerPath} from '../utils/getMissKeyWorkerPath';
import logger from '../../../logger';
import {getMissKeyHookId, getMissKeyHookSecret} from '../utils/getMissKeyHeader';
import fetchMissKeyApi from '../utils/api';


const mention = async (req: Request, res: Response) => {
  // logger.log(    JSON.stringify(req?.body, null, 2))

  const secret = getMissKeyHookSecret(req?.headers);
  const hookId = getMissKeyHookId(req?.headers);
  const {eventId, type} = req?.body;
  const renoteId = req?.body?.body?.note?.id;
  const text = req?.body?.body?.note?.text;
  const userId = req?.body?.body?.note?.userId;
  // logger.log(JSON.stringify({secret, hookId, eventId, type, renoteId, text, userId},null,2))

  // リアクションを返す
  fetchMissKeyApi.addReaction({
    noteId: renoteId,
    reaction: '👀',
  }).catch((err) => logger.error(err?.stack ?? err?.message ?? err ?? 'addReaction error'))


  // シェル芸を実行して結果を返す
  new Worker(getMissKeyWorkerPath('exec'), {
    workerData: {
      secret, hookId, eventId, type, renoteId, text, userId
    }
  })
}

export {mention}