import { decodeToken, createToken, signup, loginWithEmailAndPassword } from '../controller';
import { UserModel, IUserModel } from '../../user';
import { userDemo } from '../../../../test/fixtures';
import { mongoEnv } from '../../../../test/setup';

let user: IUserModel;

describe('AuthController', () => {
  beforeAll(async () => {
    await mongoEnv.open();
  });

  afterAll(async () => {
    await mongoEnv.close();
  });
  describe('createToken', () => {
    beforeEach(async () => {
      await mongoEnv.reset();
      user = await UserModel.create(userDemo);
    });

    test('be able to create a jwt token', async () => {
      expect(typeof createToken(user)).toBe('string');
    });
  });

  describe('decodeToken', () => {
    beforeEach(async () => {
      await mongoEnv.reset();
      user = await UserModel.create(userDemo);
    });

    test('be able to decode a good token', async () => {
      const token = createToken(user);

      // @ts-ignore
      expect(decodeToken(token)._id).toBe(user._id.toString());
    });

    test('throw "jwt malformed" if token is not a valid one', async () => {
      const token = 'helloworld';

      function call() {
        decodeToken(token);
      }

      expect(call).toThrowError('jwt malformed');
    });
  });

  describe('loginWithEmailAndPassword', () => {
    beforeEach(async () => {
      await mongoEnv.reset();
      user = await UserModel.create(userDemo);
    });

    test('be able to login with email and password', async () => {
      const res = await loginWithEmailAndPassword(userDemo);
      expect(typeof res.token).toBe('string');
    });

    test('throw "Unauthorized" if wrong password when login', async () => {
      try {
        await loginWithEmailAndPassword({ email: userDemo.email, password: 'helloworld' });
      } catch (error) {
        expect(error.message).toBe('Unauthorized');
      }
    });
  });

  describe('signup', () => {
    beforeEach(async () => {
      await mongoEnv.reset();
      user = await UserModel.create(userDemo);
    });

    test('be able to signup and receive a jwt token', async () => {
      const info = {
        email: 'jonsnow@gmail.com',
        password: 'password123',
      };

      const res = await signup(info);

      expect(typeof res.token).toBe('string');
    });

    test('throw "Email must be unique" if email already use', async () => {
      const info = {
        email: userDemo.email,
        password: 'password123',
      };

      try {
        await signup(info);
      } catch (error) {
        expect(error.message).toBe('Email must be unique');
      }
    });

    test('throw "password must be at least 6 characters" if password is not long enough', async () => {
      const info = {
        email: 'jonsnow@gmail.com',
        password: 'pass',
      };

      try {
        await signup(info);
      } catch (error) {
        expect(error.message).toBe('password must be at least 6 characters');
      }
    });
  });
});
