import express from 'express'
import {LOG_PATH, PORT} from './env';
import missKeyRouter from './service/misskey/route';
import morgan from 'morgan';
import logger from './logger';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';


const app = express()

app.use(bodyParser.urlencoded({extended: false}))


app.use(bodyParser.json())

app.use(morgan('combined', {
  stream: fs.createWriteStream(LOG_PATH, {flags: 'a'})
}));

// app.get('/', (req, res) => res.send(PING_MSG))

app.use('/missKey', missKeyRouter);

app.listen(PORT, () => logger.log('shellgeiBot listening', PORT))
