import {Request, Response} from 'express';

// TODO: シェルゲイスキー以外のフォローは排除

const followed = (req: Request, res: Response) => {
  return res.send('followed')
}

export {followed}