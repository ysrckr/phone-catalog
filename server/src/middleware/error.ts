import type { NextFunction, Request, Response } from 'express';
import type { ErrorResponse } from '../utils/ErrorResponse';

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(err.stack);
  }

  res.status(err.statusCode || 500).json({
    error: err.message || 'Server Error',
  });
};