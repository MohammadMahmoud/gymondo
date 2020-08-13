import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

//Middleware
import accessLog from '../http/middleware/access-log';
import centralErrorHandler from '../http/middleware/central-error-handler';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { Validator } from 'express-json-validator-middleware';
import timeout from 'connect-timeout';
import cors from 'cors';
import 'express-async-errors';

//Route
import routes from '../http/routes';

dotenv.config();

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.init();
  }

  private initDeps() {
    console.log('Init Dependencies');
    return {
      mongodb: mongoose.connect(
        `mongodb://${process.env.MONGDB_HOST}`,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
        (err) => {
          if (err) console.log('MongoDB Connection Error', err);
        }
      ),
    };
  }

  private initComponents() {
    this.initDeps();
    console.log('Dependencies initialized');

    const middleware = {
      accessLog: accessLog,
      cors: cors(),
      validator: new Validator({ allErrors: true }).validate,
      bodyParserUrlencoded: bodyParser.urlencoded({ extended: false }),
      bodyParserJSON: bodyParser.json(),
      helmet: helmet(),
      cookieParser: cookieParser(),
      requestTimeout: timeout('5s'),
      compression: compression(),
      centralErrorHandler: centralErrorHandler,
    };
    return { middleware };
  }

  private init() {
    const { middleware } = this.initComponents();
    const router = routes.get();

    //Middleware
    this.app.use(middleware.bodyParserUrlencoded);
    this.app.use(middleware.bodyParserJSON);
    this.app.use(middleware.helmet);
    this.app.use(middleware.requestTimeout);
    this.app.use(middleware.cookieParser);
    this.app.use(middleware.compression);
    this.app.use(middleware.accessLog);
    this.app.use(middleware.cors);

    this.app.use('/', router);

    //Catch Unhandled Exceptions
    this.app.use(middleware.centralErrorHandler);
  }
}
export default new Server().app;
