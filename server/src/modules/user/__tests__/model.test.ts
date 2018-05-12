import * as mongoose from 'mongoose';

import { UserModel } from '../model';
import { userDemo } from '../../../../test/fixtures';

describe('UserModel', () => {
  describe('create', () => {
    beforeEach(async () => {
      await mongoose.connection.dropDatabase();
    });

    test('hash password on user creation', async () => {
      const user = await UserModel.create(userDemo);

      expect(user.email).toBe(userDemo.email);
      expect(user.password).not.toBe(userDemo.password);
    });

    test('throw "Password is not long enough" if password have less than 6 characters', async () => {
      const data = {
        email: 'hello@gmail.com',
        password: 'pass',
      };

      try {
        await UserModel.create(data);
      } catch (error) {
        expect(error.errors.password.message).toBe('Password is not long enough');
      }
    });

    test('throw "Email must be unique" if email already exist on user creation', async () => {
      await UserModel.create(userDemo);

      try {
        await UserModel.create(userDemo);
      } catch (error) {
        expect(error.message).toBe('Email must be unique');
      }
    });
  });

  describe('_comparePassword', () => {
    beforeEach(async () => {
      await mongoose.connection.dropDatabase();
    });

    test('_comparePassword -> compare the password correctly', async () => {
      const user = await UserModel.create(userDemo);

      expect(user._comparePassword('password123')).toBe(true);
      expect(user._comparePassword('helloworld')).toBe(false);
    });
  });
});
