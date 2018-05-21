import { ProjectEnv } from '../types';

const envContants = {
  development: {
    PORT: 4000,
    DB_URL: 'mongodb://localhost/airbnb-clone-dev',
    JWT_SECRET: 'mysecret',
    SALT_ROUND: 8,
  },
  test: {
    PORT: 4000,
    DB_URL: 'mongodb://localhost/airbnb-clone-test',
    JWT_SECRET: 'mysecret',
    SALT_ROUND: 4,
  },
  production: {
    PORT: process.env.PORT || 4000,
    DB_URL: 'mongodb://localhost/airbnb-clone',
    JWT_SECRET: 'mysecret',
    SALT_ROUND: 10,
  },
};

const env: ProjectEnv = process.env.NODE_ENV;

export const constants = envContants[env];

export const isDev = process.env.NODE_ENV === 'development'
