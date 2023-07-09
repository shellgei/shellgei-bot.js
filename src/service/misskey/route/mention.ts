import {Request, Response} from 'express';
import {getMissKeyHookId, getMissKeyHookSecret} from '../utils/getMissKeyHeader';
import {MISS_KEY_BOT_USER_ID, MISS_KEY_MENTION_SECRET} from '../../../env';
import logger from '../../../logger';
import fetchMissKeyApi from '../utils/api';


const mention = async (req: Request, res: Response) => {
  // logger.log(    JSON.stringify(req?.body, null, 2))
  const secret = getMissKeyHookSecret(req?.headers);
  const hookId = getMissKeyHookId(req?.headers);
  if (secret !== MISS_KEY_MENTION_SECRET) {
    logger.error(hookId, ' secret is not match: ', secret)
    return;
  }

  const {eventId, type, body} = req?.body;
  if (type !== 'mention') {
    logger.error(eventId, hookId, ' type is not match: ', type)
    return;
  }

  const renoteId = body?.note?.id;
  if (!renoteId) {
    logger.error(eventId, hookId, ' renoteId is null')
    return;
  }

  const text = body?.note?.text?.replace('@sh', '')?.trim();
  if (!text) {
    logger.error(renoteId, eventId, hookId, ' text is null', body?.note?.text)
    return;
  }

  const userId = body?.note?.userId;
  if (userId === MISS_KEY_BOT_USER_ID) {
    logger.error(renoteId, eventId, hookId, 'user is me')
    return;
  }

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