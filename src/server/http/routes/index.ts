import express from 'express';
import api from './api';
import * as dotenv from 'dotenv';

const Router = express.Router();

dotenv.config();

class Routing {
  static get(): express.Router {
    Router.get('/', (req: express.Request, res: express.Response) => {
      res.status(200).send({
        appName: process.env.APP_NAME,
        version: process.env.APP_VER,
      });
    });

    Router.get(
      '/favicon.ico',
      (req: express.Request, res: express.Response) => {
        res.status(200).send({ message: 'ok' });
      }
    );

    Router.use('/api', api.get());

    Router.use('/*', (req, res) => {
      res.status(401).json({ error: 'Invalid path or user credentials' });
    });

    return Router;
  }
}

export default Routing;
