import { UserModel } from '../model';

describe('UserModel', () => {
  beforeEach(async () => {
    await UserModel.remove({});
  });

  test('hash password on user creation', async () => {
    const data = {
      email: 'hello@gmail.com',
      password: 'password123',
    };

    const user = await UserModel.create(data);

    expect(user.email).toBe(data.email);
    expect(user.password).not.toBe(data.password);
  });

  test('ask for a minimun of 6 characters for the password', async () => {
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

  test('_comparePassword correctly', async () => {
    const data = {
      email: 'hello@gmail.com',
      password: 'password123',
    };

    const user = await UserModel.create(data);

    expect(user._comparePassword('password123')).toBe(true);
    expect(user._comparePassword('helloworld')).toBe(false);
  });
});
