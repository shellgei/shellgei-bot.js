import {Request, Response} from 'express';
import {getMissKeyHookId, getMissKeyHookSecret} from '../utils/getMissKeyHeader';
import {MISS_KEY_MENTION_SECRET} from '../../../env';
import logger from '../../../logger';
import fetchMissKeyApi from '../utils/api';


const mention = async (req: Request, res: Response) => {
  const secret = getMissKeyHookSecret(req?.headers);
  const hookId = getMissKeyHookId(req?.headers);
  if (secret !== MISS_KEY_MENTION_SECRET) {
    logger.error(hookId, ' secret is not match: ', secret)
    return;
  }

  const {eventId, userId, type, body} = req?.body;
  if (type !== 'mention') {
    logger.error(eventId, userId, hookId, ' type is not match: ', type)
    return;
  }

  const renoteId = body?.note?.id;
  if (!renoteId) {
    logger.error(eventId, userId, hookId, ' renoteId is null')
    return;
  }

  const text = body?.note?.text?.replace('@sh', '')?.trim();
  if (!text) {
    logger.error(renoteId, eventId, userId, hookId, ' text is null', body?.note?.text)
    return;
  }


  //TODO:　自分自身から打たれたものには反応しない
  //TODO: 引用しまくるのは環境変数で設定した回数まで


  logger.log(eventId, userId, hookId, renoteId, 'fired docker', JSON.stringify({base: body?.note?.text, text,}));

  const reply = text;

  await fetchMissKeyApi.createNote({
    localOnly: true,
    noExtractMentions: true,
    noExtractHashtags: false,
    noExtractEmojis: false,
    text: reply + ' -- ok',
    renoteId,
  })
}

export {mention}