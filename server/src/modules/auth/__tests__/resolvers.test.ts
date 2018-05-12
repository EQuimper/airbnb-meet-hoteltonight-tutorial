import { graphql } from 'graphql';

import { UserModel } from '../../user';
import { schema } from '../../../graphqlSetup';
import { userDemo } from '../../../../test/fixtures';

describe('Auth Resolvers', () => {
  describe('loginWithEmailAndPassword', () => {
    beforeEach(async () => {
      await UserModel.remove({});

      await UserModel.create(userDemo);
    });

    test('be able to login and return a token', async () => {
      const query = `
        mutation {
          loginWithEmailAndPassword(input: { email: "${userDemo.email}", password: "${
        userDemo.password
      }" }) {
            token
          }
        }
      `;

      const res = await graphql(schema, query);

      expect(typeof res.data!.loginWithEmailAndPassword.token).toBe('string');
    });

    test('throw "Unauthorized" if wrong password', async () => {
      const query = `
        mutation {
          loginWithEmailAndPassword(input: { email: "${userDemo.email}", password: "helloworld" }) {
            token
          }
        }
      `;

      const res = await graphql(schema, query);

      expect(res.errors![0].message).toBe('Unauthorized');
    });

    test('throw "User dont exist" if user not found', async () => {
      const query = `
        mutation {
          loginWithEmailAndPassword(input: { email: "jonsnow@gmail.com", password: "helloworld" }) {
            token
          }
        }
      `;

      const res = await graphql(schema, query);

      expect(res.errors![0].message).toBe('User not exist');
    });
  });

  describe('signup', () => {
    beforeEach(async () => {
      await UserModel.remove({});
    });

    test('be able to signup and return token', async () => {
      const query = `
        mutation {
          signup(input: { email: "${userDemo.email}", password: "${userDemo.password}" }) {
            token
          }
        }
      `;

      const res = await graphql(schema, query);

      expect(typeof res.data!.signup.token).toBe('string');
    });

    test('throw "Email must be unique" if email already use', async () => {
      await UserModel.create(userDemo);

      const query = `
        mutation {
          signup(input: { email: "${userDemo.email}", password: "${userDemo.password}" }) {
            token
          }
        }
      `;

      const res = await graphql(schema, query);

      expect(res.errors![0].message).toBe('Email must be unique');
    });
  });
});
