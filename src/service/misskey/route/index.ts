import express from 'express';
import {mention} from './mention';
import {routeWrapper} from '../../../utils/routeWrapper';
import logger from '../../../logger';
import {getMissKeyHookId, getMissKeyHost} from '../utils/getMissKeyHeader';
import {DEV_MODE, MISS_KEY_HOST} from '../../../env';

const missKeyRouter = express.Router();

missKeyRouter.use((req, res, next) => {
  if (DEV_MODE) {
    return next();
  }

  const requestHost = getMissKeyHost(req?.headers);
  const hookId = getMissKeyHookId(req?.headers);

  if (requestHost !== MISS_KEY_HOST) {
    logger.error(hookId, ': host is not match: ', requestHost)
    return;
  } else {
    logger.log(hookId, ': host is match')
  }

  next();
})

missKeyRouter.post('/mention', routeWrapper(mention))


export default missKeyRouter;