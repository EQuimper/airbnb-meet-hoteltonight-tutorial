import { UserModel } from '../model';

describe('UserModel', () => {
  beforeEach(async () => {
    await UserModel.remove({});
  });

  describe('create', () => {
    test('hash password on user creation', async () => {
      const data = {
        email: 'hello@gmail.com',
        password: 'password123',
      };

      const user = await UserModel.create(data);

      expect(user.email).toBe(data.email);
      expect(user.password).not.toBe(data.password);
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
      const data = {
        email: 'hello@gmail.com',
        password: 'password123',
      };

      await UserModel.create(data);

      try {
        await UserModel.create(data);
      } catch (error) {
        expect(error.message).toBe('Email must be unique');
      }
    });
  });

  describe('_comparePassword', () => {
    test('_comparePassword -> compare the password correctly', async () => {
      const data = {
        email: 'hello@gmail.com',
        password: 'password123',
      };

      const user = await UserModel.create(data);

      expect(user._comparePassword('password123')).toBe(true);
      expect(user._comparePassword('helloworld')).toBe(false);
    });
  });
});
