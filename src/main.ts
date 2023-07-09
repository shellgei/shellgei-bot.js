import express from 'express'
import {DEV_MODE, PING_MSG, PORT} from './env';
import missKeyRouter from './service/misskey/route';
import morgan from 'morgan';
import logger from './logger';
import * as bodyParser from 'body-parser';


const app = express()

app.use(bodyParser.urlencoded({extended: false}))


app.use(bodyParser.json())

app.use(morgan('combined'));

DEV_MODE && app.get('/', (req, res) => res.send(PING_MSG))
app.use('/missKey', missKeyRouter);
app.listen(PORT, () => logger.log(process.env.NODE_ENV, ':shellgeiBot listening:', PORT))
