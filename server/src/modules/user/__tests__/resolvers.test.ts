import { graphql } from 'graphql';

import { UserModel } from '../../user';
import { schema } from '../../../graphqlSetup';
import { decodeToken } from '../../auth';

const data = {
  email: 'hello@gmail.com',
  password: 'password123',
};

describe('User Resolvers', () => {
  beforeEach(async () => {
    await UserModel.remove({});
  });

  describe('me', () => {
    beforeEach(async () => {
      await UserModel.create(data);
    });

    test('be able to get info if logged', async () => {
      let query = `
        mutation {
          loginWithEmailAndPassword(input: { email: "${data.email}", password: "${
        data.password
      }" }) {
            token
          }
        }
      `;

      let res = await graphql(schema, query);

      const { token } = res.data!.loginWithEmailAndPassword;

      const decode = decodeToken(token);

      const ctx = {
        user: decode,
      };

      query = `
        query {
          me {
            _id
            email
          }
        }
      `;

      res = await graphql(schema, query, null, ctx);

      const { me } = res.data!;

      // @ts-ignore
      expect(me._id).toEqual(decode._id);
      expect(me.email).toBe(data.email);
    });
  });
});
