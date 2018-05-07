import { graphql } from 'graphql';

import { decodeToken } from '../src/modules/auth';
import { schema } from '../src/graphqlSetup';

export const mockLogin = async (info: { email: string; password: string }) => {
  const query = `
  mutation {
    loginWithEmailAndPassword(input: { email: "${info.email}", password: "${info.password}" }) {
      token
    }
  }
`;

  const res = await graphql(schema, query);

  const { token } = res.data!.loginWithEmailAndPassword;

  const decode = decodeToken(token);

  return {
    user: decode,
  };
};
