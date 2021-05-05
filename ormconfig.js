/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  type: 'mongodb',
  useUnifiedTopology: true,
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  database: 'data',
  synchronize: true,
  logging: false,
  entities:
    process.env.NODE_ENV === 'dev'
      ? ['src/infra/typeorm/schemas/*.ts']
      : ['bin/infra/typeorm/schemas/*.js'],
  cli: {
    entitiesDir:
      process.env.NODE_ENV === 'dev'
        ? 'src/infra/typeorm/entities'
        : 'bin/infra/typeorm/entities',
  },
};
