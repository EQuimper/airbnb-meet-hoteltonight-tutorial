import * as mongoose from 'mongoose';

import { constants } from '../src/config/constants';

class MongoEnv {
  open() {
    return new Promise(async (resolve, reject) => {
      try {
        // @ts-ignore
        await mongoose.connect(constants.DB_URL, {
          autoReconnect: true,
          connectTimeoutMS: 10000,
          reconnectInterval: 1000,
        });

        mongoose.set('debug', false);

        resolve();
      } catch (error) {
        reject();
      }
    });
  }

  close() {
    return mongoose.disconnect();
  }

  reset() {
    const promises = mongoose.connection.modelNames().map(async modelName => {
      await mongoose.connection.model(modelName).remove({});
    });

    return Promise.all(promises);
  }
}

export const mongoEnv = new MongoEnv();
