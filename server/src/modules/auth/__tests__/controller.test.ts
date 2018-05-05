import { authController } from '../controller';
import { UserModel } from '../../user';

describe('AuthController', () => {
  beforeEach(async () => {
    await UserModel.remove({});
  });

  test('be able to create a jwt token', async () => {
    const data = {
      email: 'hello@gmail.com',
      password: 'password123',
    };

    const user = await UserModel.create(data);

    expect(typeof authController._createToken(user)).toBe('string');
  });
});
