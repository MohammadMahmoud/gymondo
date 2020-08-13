import express from 'express';
import WorkoutController from '../../controllers/workout';

const Router = express.Router();

class Routing {
  static get(): express.Router {
    const workoutController = new WorkoutController();

    // GET api/workout
    Router.get('/', workoutController.getWorkouts);

    // GET api/workout/:id
    Router.get('/:id', workoutController.getWorkoutById);

    return Router;
  }
}

export default Routing;
