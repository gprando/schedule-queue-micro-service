/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-rest-params */
import { Request, Response, NextFunction } from 'express';

import logger from './logger';

const expressDevLogger = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const startHrTime = process.hrtime();

  logger.http(
    `Request: ${request.method} ${
      request.url
    } at ${new Date().toUTCString()}, User-Agent: ${request.get('User-Agent')}`,
  );
  logger.http(`Request Body: ${JSON.stringify(request.body)}`);

  const [oldWrite, oldEnd] = [response.write, response.end];
  const chunks: Buffer[] = [];
  (response.write as unknown) = function (chunk: any): void {
    chunks.push(Buffer.from(chunk));
    (oldWrite as Function).apply(response, arguments);
  };

  response.end = function (chunk: any): void {
    if (chunk) {
      chunks.push(Buffer.from(chunk));
    }

    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

    logger.http(
      `Response ${response.statusCode} ${elapsedTimeInMs.toFixed(3)} ms`,
    );

    const body = Buffer.concat(chunks).toString('utf8');
    logger.http(`Response Body: ${body}`);
    (oldEnd as Function).apply(response, arguments);
  };

  next();
};
export default expressDevLogger;
