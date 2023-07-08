import express from 'express'
import morgan from 'morgan';
import {PING_MSG, PORT} from './env';
import missKeyRouter from './route/misskey/index';

const app = express()

app.use(morgan('combined'));

app.get('/', (req, res) => res.send(PING_MSG))

app.use('/missKey', missKeyRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
