import * as mongoose from 'mongoose';

import dbInit from '../src/config/db';
// import constants from '../src/config/constants';

export const disconnect = (done: any) => {
  mongoose.disconnect();

  done();
};

export const connect = async (done: any) => {
  const promises = Object.keys(mongoose.connection.collections).map(name => {
    return mongoose.connection.collections[name].remove({});
  });

  await Promise.all(promises);

  dbInit().then(() => {
    done();
  });
};
