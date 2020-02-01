import 'dotenv/config';
import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';

import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';
import errorMiddleware from './app/middlewares/error';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    if (process.env.NODE_ENV === 'development') {
      this.exceptionHandler();
    }
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(errorMiddleware);
  }
}

export default new App().server;
