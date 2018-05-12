import * as mongoose from 'mongoose';

import { constants } from './constants';

export default () => {
  return mongoose.connect(constants.DB_URL);
};
