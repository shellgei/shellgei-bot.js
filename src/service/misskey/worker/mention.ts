import {MISS_KEY_BOT_USER_ID, MISS_KEY_MENTION_SECRET} from '../../../env';
import logger from '../../../logger';
import fetchMissKeyApi from '../utils/api';
import {workerWrapper} from '../../../utils/workerWrapper';
import {workerData} from 'worker_threads';
import {execShellgei} from '../../../executor/execShellgei';

const worker = async (args: any) => {
  const {secret, hookId, eventId, type, renoteId, text, userId, hasRenote} = args;

  if (secret !== MISS_KEY_MENTION_SECRET) {
    logger.error(hookId, ' secret is not match: ', secret)
    return;
  }

  if (!renoteId) {
    logger.error(eventId, hookId, ' renoteId is null')
    return;
  }

  // リアクションを返す
  fetchMissKeyApi.addReaction({
    noteId: renoteId,
    reaction: '👀',
  }).catch((err) => logger.error(err?.stack ?? err?.message ?? err ?? 'addReaction error'))

  if (type !== 'mention') {
    logger.error(eventId, hookId, ' type is not match: ', type)
    return;
  }

  const command = text?.replace('@sh', '')?.trim();
  if (!command) {
    logger.error(renoteId, eventId, hookId, ' entrypoint is null', text)
    return;
  }

  if (userId === MISS_KEY_BOT_USER_ID) {
    logger.error(renoteId, eventId, hookId, 'user is me')
    return;
  }

  if (hasRenote) {
    logger.error('renote is not allowed', renoteId)
    return;
  }

  logger.log(eventId, userId, hookId, renoteId, 'fired docker', JSON.stringify({text, command}));

  const reply = await execShellgei(command);

  await fetchMissKeyApi.createNote({
    localOnly: true,
    noExtractMentions: true,
    noExtractHashtags: false,
    noExtractEmojis: false,
    text: reply,
    renoteId,
  })
}

workerWrapper(worker, workerData)