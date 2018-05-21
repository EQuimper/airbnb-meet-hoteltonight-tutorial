import { createUser, getUserByEmail, getViewer } from '../controller';
import { UserModel } from '../model';
import { userDemo } from '../../../../test/fixtures';
import { mongoEnv } from '../../../../test/setup';

describe('UserController', () => {
  beforeAll(async () => {
    await mongoEnv.open();
  });

  afterAll(async () => {
    await mongoEnv.close();
  });

  describe('createUser', () => {
    beforeEach(async () => {
      await mongoEnv.reset();
    });

    test('be able to create a user', async () => {
      const user = await createUser(userDemo);

      expect(user.email).toBe(userDemo.email);
      expect(user.password).not.toBe(userDemo.password);
      expect(user.createdAt).not.toBeUndefined();
      expect(user.updatedAt).not.toBeUndefined();
    });

    test('throw "email is a required field" when try to create user without email', async () => {
      const data = {
        password: 'password123',
      };

      try {
        // @ts-ignore
        await createUser(data);
      } catch (error) {
        expect(error.message).toBe('email is a required field');
      }
    });

    test('throw "password is a required field" when try to create user without password', async () => {
      const data = {
        email: 'hello@gmail.com',
      };

      try {
        // @ts-ignore
        await createUser(data);
      } catch (error) {
        expect(error.message).toBe('password is a required field');
      }
    });

    test('throw "email must be a valid email" when try to create user without a valid email', async () => {
      const data = {
        email: 'joe123',
        password: 'password123',
      };

      try {
        await createUser(data);
      } catch (error) {
        expect(error.message).toBe('email must be a valid email');
      }
    });

    test('throw "password must be at least 6 characters" when try to create user with a password too small', async () => {
      const data = {
        email: 'hello@gmail.com',
        password: 'pass',
      };

      try {
        await createUser(data);
      } catch (error) {
        expect(error.message).toBe('password must be at least 6 characters');
      }
    });
  });

  describe('getUserByEmail', () => {
    beforeEach(async () => {
      await mongoEnv.reset();
    });

    test('return a user by his email', async () => {
      await createUser(userDemo);

      const user = await getUserByEmail(userDemo.email);

      expect(user.email).toBe(userDemo.email);
    });

    test('throw "User not exist" if try when email dont match', async () => {
      try {
        await getUserByEmail('hello@gmail.com');
      } catch (error) {
        expect(error.message).toBe('User not exist');
      }
    });

    test('throw "email is a required field" when try without an email', async () => {
      try {
        // @ts-ignore
        await getUserByEmail();
      } catch (error) {
        expect(error.message).toBe('email is a required field');
      }
    });
  });

  describe('getViewer', () => {
    beforeEach(async () => {
      await mongoEnv.reset();
    });

    test('return user from the id provided', async () => {
      const user = await createUser(userDemo);

      const res = await getViewer(user._id);

      expect(res._id).toEqual(user._id);
      expect(res.email).toBe(user.email);
    });

    test('throw "Must be a valid id" if id is not valid', async () => {
      try {
        await getViewer('123');
      } catch (error) {
        expect(error.message).toBe('Must be a valid id');
      }
    });

    test('throw "User not exist" if id dont belong to a user', async () => {
      const user = await UserModel.create(userDemo);

      await user.remove();

      try {
        await getViewer(user._id);
      } catch (error) {
        expect(error.message).toBe('User not exist');
      }
    });
  });
});
