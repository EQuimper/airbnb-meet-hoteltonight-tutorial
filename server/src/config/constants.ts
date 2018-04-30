import { ProjectEnv } from '../types';

const constants = {
  development: {
    PORT: 4000,
    DB_URL: 'mongodb://localhost/airbnb-clone-dev',
  },
  test: {
    PORT: 4000,
    DB_URL: 'mongodb://localhost/airbnb-clone-test',
  },
  production: {
    PORT: process.env.PORT || 4000,
    DB_URL: 'mongodb://localhost/airbnb-clone',
  },
};

const env: ProjectEnv = process.env.NODE_ENV;

export default constants[env];
