import * as mongoose from 'mongoose';

import { constants, isDev } from './constants';

export default () => {
  if (isDev) {
    mongoose.set('debug', true);
  }
  return mongoose.connect(constants.DB_URL);
};
