import express from 'express';
import { ValidationError } from 'express-json-validator-middleware';

const centralErrorHandler = (
  err: express.ErrorRequestHandler,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (req.timedout) {
    res.status(408).json('Request Time Out');
    next();
  }
  if (
    err instanceof ValidationError &&
    err.validationErrors.body instanceof Array
  ) {
    const validationErrors = err.validationErrors.body.map((error) => {
      return error.message;
    });
    res.status(400).json(validationErrors[0]);
    next();
  }
  if (res.statusCode === 200) {
    console.error('server crash', err);
    res.status(500).json({ error: `Error ${err}` });
    next();
  }
  next();
};

export default centralErrorHandler;
