import {Request, Response} from 'express';
import logger from '../logger';

type Route = (req: Request, res: Response) => Promise<any | void | unknown>

const routeWrapper = (route: Route) => (req: Request, res: Response) => {
  route(req, res).catch((err: Error) => {
    logger.error(err?.stack ?? err?.message ?? err ?? 'routeWrapper error');
    res.status(500).send('Internal Server Error');
  })
}

export {routeWrapper}