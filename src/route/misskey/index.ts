import express from 'express';
import {followed} from './followed';
import {mention} from './mention';

const missKeyRouter = express.Router();

// TODO: X-Misskey-Hook-Secretの検証

missKeyRouter.post('/followed', followed);
missKeyRouter.post('/mention', mention)


export default missKeyRouter;