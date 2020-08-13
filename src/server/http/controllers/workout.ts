import express from 'express';
import WorkoutModel from '../models/workout';

interface IWorkoutController {
  getWorkouts(req: express.Request, res: express.Response): Promise<void>;
  getWorkoutById(req: express.Request, res: express.Response): Promise<void>;
}

export default class WorkoutsController implements IWorkoutController {
  // GET api/workout
  public async getWorkouts(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const query = req.query;
    let filters = {};
    if (query.category) {
      filters = Object.assign(filters, {
        category: query.category.toString().split(','),
      });
    }
    if (query.startDate) {
      const startDate = new Date(query.startDate.toString());
      filters = Object.assign(filters, {
        startDate: {
          $gte: startDate,
          $lte: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
        },
      });
    }
    const workouts = await WorkoutModel.paginate(filters, {
      sort: { startDate: 'asc' },
      page: query.page ? parseInt(`${query.page}`) : 1,
      limit: query.limit ? parseInt(`${query.limit}`) : 10,
    }).catch((e: Error) => {
      console.error(e);
      res.status(400).json('Encountered Error');
    });
    if (workouts && workouts.docs.length > 0) {
      res.status(200).json(workouts);
    } else {
      res.status(404).json('No workouts found in the database');
    }
  }

  // GET api/workout/:id
  public async getWorkoutById(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const params = req.params;
    const workout = await WorkoutModel.findById(params.id)
      .exec()
      .catch((e) => {
        console.error(e);
        res.status(400).json('Encountered Error');
      });
    if (!workout) {
      res.status(404).json('Not found');
    } else {
      res.status(200).json(workout);
    }
  }
}
