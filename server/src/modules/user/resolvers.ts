import { ResolverMap } from '../../types/graphql-utils';
import { userController } from './controller';
import { authController } from '../auth';

const resolvers: ResolverMap = {
  Query: {
    bye: () => 'hello',
  },
  Mutation: {
    signup: async (_, args: GQL.ISignupOnMutationArguments) => {
      try {
        const user = await userController._create(args.input);

        return {
          token: authController._createToken(user),
        };
      } catch (error) {
        throw error;
      }
    },
  },
};

export default resolvers;
