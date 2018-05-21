import * as mongoose from 'mongoose';

import { createMockUsers } from '../modules';
import { createMockPlaces } from '../modules/place/mocks';
import { isDev } from '../config/constants';

const COUNTS: { [index: string]: number } = {
  Place: 10,
  User: 5,
  Reservation: 0,
  Profile: 0,
};

const mocks = (name: string) => (count: number) => {
  switch (name) {
    case 'Place':
      return createMockPlaces(count);
    case 'User':
      return createMockUsers(count);
    default:
      return;
  }
};

export const createMocks = async () => {
  if (isDev) {
    mongoose.connection.modelNames().forEach(async modelName => {
      const count = await mongoose.connection.model(modelName).count({});

      const mockCount = COUNTS[modelName];

      if (count < mockCount) {
        await mocks(modelName)(mockCount);
      }
    });
  }

  return Promise.resolve();
};
