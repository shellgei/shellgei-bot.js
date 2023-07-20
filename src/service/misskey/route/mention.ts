import {Request, Response} from 'express';
import {Worker} from 'worker_threads';
import {getMissKeyWorkerPath} from '../utils/getMissKeyWorkerPath';
import {getMissKeyHookId, getMissKeyHookSecret} from '../utils/getMissKeyHeader';


const mention = async (req: Request, res: Response) => {
  // require("fs").writeFileSync(require("path").join(require("path").resolve(), "body.json"), JSON.stringify(req?.body, null, 2), {encoding: "utf-8"})

  const secret = getMissKeyHookSecret(req?.headers);
  const hookId = getMissKeyHookId(req?.headers);
  const {eventId, type} = req?.body;
  const renoteId = req?.body?.body?.note?.id;
  const text = req?.body?.body?.note?.text;
  const userId = req?.body?.body?.note?.userId;
  const hasRenote = Boolean(req?.body?.body?.note?.renote);
  // logger.log(JSON.stringify({secret, hookId, eventId, type, renoteId, text, userId, hasRenote},null,2))

  // シェル芸を実行して結果を返す
  new Worker(getMissKeyWorkerPath('mention'), {
    workerData: {
      secret, hookId, eventId, type, renoteId, text, userId, hasRenote
    }
  })

  return res.status(200).end();
}

export {mention}