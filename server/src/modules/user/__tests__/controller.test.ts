import { userController } from '../controller';
import dbInit from '../../../config/db';
import { UserModel } from '../model';

beforeEach(async () => {
  dbInit();

  await UserModel.remove({});
});

test('Should be able to create a user', async () => {
  const data = {
    email: 'hello@gmail.com',
    password: 'password123',
  };

  const user = await userController._create(data);

  expect(user.email).toBe(data.email);
  expect(user.password).not.toBe(data.password);
  expect(user.createdAt).not.toBeUndefined();
  expect(user.updatedAt).not.toBeUndefined();
});

test('Should throw error when try to create user without email', async () => {
  const data = {
    password: 'password123',
  };

  try {
    // @ts-ignore
    await userController._create(data);
  } catch (error) {
    expect(error.message).toBe('email is a required field');
  }
});

test('Should throw error when try to create user without password', async () => {
  const data = {
    email: 'hello@gmail.com',
  };

  try {
    // @ts-ignore
    await userController._create(data);
  } catch (error) {
    expect(error.message).toBe('password is a required field');
  }
});

test('Should throw error when try to create user without a valid email', async () => {
  const data = {
    email: 'joe123',
    password: 'password123',
  };

  try {
    await userController._create(data);
  } catch (error) {
    expect(error.message).toBe('email must be a valid email');
  }
});

test('Should throw error when try to create user with a password too small', async () => {
  const data = {
    email: 'hello@gmail.com',
    password: 'pass',
  };

  try {
    await userController._create(data);
  } catch (error) {
    expect(error.message).toBe('password must be at least 6 characters');
  }
});

test('Should return a user by his email with _getByEmail', async () => {
  const data = {
    email: 'hello@gmail.com',
    password: 'password123',
  };

  await userController._create(data);

  const user = await userController._getByEmail(data.email);

  expect(user.email).toBe(data.email);
});

test('Should throw error if try to _getByEmail when email dont match', async () => {
  try {
    await userController._getByEmail('hello@gmail.com');
  } catch (error) {
    expect(error.message).toBe('User not exist');
  }
});

test('Should thow error when try to _getByEmail without an email', async () => {
  try {
    // @ts-ignore
    await userController._getByEmail();
  } catch (error) {
    expect(error.message).toBe('email is a required field');
  }
});
