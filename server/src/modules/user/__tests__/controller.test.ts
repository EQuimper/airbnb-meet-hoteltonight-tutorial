import { createUser, getUserByEmail } from '../controller';
import { UserModel } from '../model';

describe('UserController', () => {
  beforeEach(async () => {
    await UserModel.remove({});
  });

  test('createUser -> be able to create a user', async () => {
    const data = {
      email: 'hello@gmail.com',
      password: 'password123',
    };

    const user = await createUser(data);

    expect(user.email).toBe(data.email);
    expect(user.password).not.toBe(data.password);
    expect(user.createdAt).not.toBeUndefined();
    expect(user.updatedAt).not.toBeUndefined();
  });

  test('createUser -> throw "email is a required field" when try to create user without email', async () => {
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

  test('createUser -> throw "password is a required field" when try to create user without password', async () => {
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

  test('createUser -> throw "email must be a valid email" when try to create user without a valid email', async () => {
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

  test('createUser -> throw "password must be at least 6 characters" when try to create user with a password too small', async () => {
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

  test('getUserByEmail -> return a user by his email with getUserByEmail', async () => {
    const data = {
      email: 'hello@gmail.com',
      password: 'password123',
    };

    await createUser(data);

    const user = await getUserByEmail(data.email);

    expect(user.email).toBe(data.email);
  });

  test('getUserByEmail -> throw "User not exist" if try to getUserByEmail when email dont match', async () => {
    try {
      await getUserByEmail('hello@gmail.com');
    } catch (error) {
      expect(error.message).toBe('User not exist');
    }
  });

  test('getUserByEmail -> throw "email is a required field" when try to getUserByEmail without an email', async () => {
    try {
      // @ts-ignore
      await getUserByEmail();
    } catch (error) {
      expect(error.message).toBe('email is a required field');
    }
  });
});
