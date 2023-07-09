import {MISS_KEY_BOT_USER_ID, MISS_KEY_MENTION_SECRET} from '../../../env';
import logger from '../../../logger';
import fetchMissKeyApi from '../utils/api';
import {workerWrapper} from '../../../utils/workerWrapper';
import {workerData} from 'worker_threads';

const worker = async (args: any) => {
  const {secret, hookId, eventId, type, renoteId, text, userId} = args;

  if (secret !== MISS_KEY_MENTION_SECRET) {
    logger.error(hookId, ' secret is not match: ', secret)
    return;
  }

  if (type !== 'mention') {
    logger.error(eventId, hookId, ' type is not match: ', type)
    return;
  }


  if (!renoteId) {
    logger.error(eventId, hookId, ' renoteId is null')
    return;
  }

  const entrypoint = text?.replace('@sh', '')?.trim();
  if (!entrypoint) {
    logger.error(renoteId, eventId, hookId, ' entrypoint is null', text)
    return;
  }

  if (userId === MISS_KEY_BOT_USER_ID) {
    logger.error(renoteId, eventId, hookId, 'user is me')
    return;
  }

  logger.log(eventId, userId, hookId, renoteId, 'fired docker', JSON.stringify({text, entrypoint}));

  const reply = entrypoint;

  await fetchMissKeyApi.createNote({
    localOnly: true,
    noExtractMentions: true,
    noExtractHashtags: false,
    noExtractEmojis: false,
    text: reply + ' -- ok',
    renoteId,
  })
}

workerWrapper(worker, workerData)