import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import workout from './workout';

const Router = express.Router();

class Routing {
  static get(): express.Router {
    Router.use('/', swaggerUI.serve);

    Router.get('/', swaggerUI.setup(swaggerDocument));

    Router.use('/workout', workout.get());

    return Router;
  }
}

export default Routing;
