import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import logger from '@/utils/logger';
import config from '@config/index';
import expressDevLogger from '@/utils/expressDevLogger';
import routes from './routes';
import '@/infra/typeorm';
import '@/container';

import exceptionHandler from './middlewares/exceptionHandler';

const swaggerDocument = YAML.load('./docs/swagger.yaml');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (config.morganLogger) {
  app.use(
    morgan(':method :url :status :response-time ms - :res[content-length]'),
  );
}

if (config.morganBodyLogger) {
  morganBody(app);
}

if (config.expressDevLogger) {
  app.use(expressDevLogger);
}

app.use(routes);
app.use(exceptionHandler);

const { port } = config;

app.listen(port, () => {
  logger.info(`Server started on port ${port}!`);
  logger.info(`docs in http://localhost:${port}/docs`);
});
