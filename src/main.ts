import * as fs from 'fs';
import express from 'express'
import {ACCESS_LOG_PATH, PING_MSG, PORT} from './env';
import missKeyRouter from './service/misskey/route';
import morgan from 'morgan';

const app = express()

app.use(morgan('combined', {
  stream: fs.createWriteStream(ACCESS_LOG_PATH, {flags: 'a'}),
}));

app.get('/', (req, res) => res.send(PING_MSG))

app.use('/missKey', missKeyRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
