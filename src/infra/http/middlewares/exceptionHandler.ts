import AppError from '@/errors/AppError';
import logger from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';

export default (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response => {
  logger.error(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
