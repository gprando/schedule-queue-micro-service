import logger from '@/utils/logger';
import config from '@config/index';
import app from './app';

const { port } = config;

app.listen(port, () => {
  logger.info(`Server started on port ${port}!`);
  logger.info(`docs in http://localhost:${port}/docs`);
});
