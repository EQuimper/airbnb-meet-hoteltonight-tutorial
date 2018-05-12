import { graphql } from 'graphql';

import { UserModel } from '../../user';
import { schema } from '../../../graphqlSetup';
import { mockLogin } from '../../../../test/mockLogin';

const data = {
  email: 'hello@gmail.com',
  password: 'password123',
};

describe('User Resolvers', () => {
  beforeEach(async () => {
    await UserModel.remove({});

    await UserModel.create(data);
  });

  describe('me', () => {
    test('be able to get info if logged', async () => {
      const ctx = await mockLogin(data);

      const query = `
        query {
          me {
            _id
            email
          }
        }
      `;

      const res = await graphql(schema, query, null, ctx);

      const { me } = res.data!;

      expect(me.email).toBe(data.email);
      expect(typeof me._id).toBe('string');
    });
  });
});
