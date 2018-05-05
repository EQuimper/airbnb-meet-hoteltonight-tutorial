import { authController } from '../controller';
import { UserModel, IUserModel } from '../../user';

describe('AuthController', () => {
  let user: IUserModel;

  const data = {
    email: 'hello@gmail.com',
    password: 'password123',
  };

  beforeEach(async () => {
    await UserModel.remove({});

    user = await UserModel.create(data);
  });

  test('be able to create a jwt token', async () => {
    expect(typeof authController._createToken(user)).toBe('string');
  });

  test('be able to decode a good token', async () => {
    const token = authController._createToken(user);

    // @ts-ignore
    expect(authController._decodeToken(token)._id).toBe(user._id.toString());
  });

  test('throw "jwt malformed" if token is not a valid one', async () => {
    const token = 'helloworld';

    function call() {
      authController._decodeToken(token);
    }

    expect(call).toThrowError('jwt malformed');
  });
});
