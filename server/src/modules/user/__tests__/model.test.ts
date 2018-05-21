import { UserModel } from '../model';
import { userDemo } from '../../../../test/fixtures';
import { mongoEnv } from '../../../../test/setup';

describe('UserModel', () => {
  beforeAll(async () => {
    await mongoEnv.open();
  });

  afterAll(async () => {
    await mongoEnv.close();
  });

  describe('create', () => {
    beforeEach(async () => {
      await mongoEnv.reset();
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
      await mongoEnv.reset();
    });

    test('_comparePassword -> compare the password correctly', async () => {
      const user = await UserModel.create(userDemo);

      expect(user._comparePassword('password123')).toBe(true);
      expect(user._comparePassword('helloworld')).toBe(false);
    });
  });
});
