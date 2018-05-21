import * as faker from 'faker';

import { UserModel } from './model';

export const createMockUsers = async (numOfUsers: number) => {
  for (let i = 0; i < numOfUsers; i++) {
    await UserModel.create({
      email: faker.internet.email(),
      password: 'password123',
    });
  }
};
