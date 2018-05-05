import { authController } from './controller';
import { ResolverMap } from '../../types/graphql-utils';

const resolvers: ResolverMap = {
  Query: {
    hello: () => 'bye',
  },
  Mutation: {
    loginWithEmailAndPassword: async (_, args: GQL.ILoginWithEmailAndPasswordOnMutationArguments) =>
      authController._loginWithEmailAndPassword(args.input),
  },
};

export default resolvers;
