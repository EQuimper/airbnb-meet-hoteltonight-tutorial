import { ProjectEnv } from '../types';

const constants = {
  development: {
    PORT: 4000,
    DB_URL: 'mongodb://localhost/airbnb-clone-dev',
    JWT_SECRET: 'mysecret',
  },
  test: {
    PORT: 4000,
    DB_URL: 'mongodb://localhost/airbnb-clone-test',
    JWT_SECRET: 'mysecret',
  },
  production: {
    PORT: process.env.PORT || 4000,
    DB_URL: 'mongodb://localhost/airbnb-clone',
    JWT_SECRET: 'mysecret',
  },
};

const env: ProjectEnv = process.env.NODE_ENV;

export default constants[env];
