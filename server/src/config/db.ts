import mongoose from 'mongoose';

import constants from './constants';

export default () => {
  mongoose.connect(constants.DB_URL);
};
