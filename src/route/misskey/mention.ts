import {Request, Response} from 'express';

const mention = (req: Request, res: Response) => {
  //TODO:　自分自身から打たれたものには反応しない
  //TODO: 引用しまくるのは環境変数で設定した回数まで
  return res.send('mention')
}

export {mention}