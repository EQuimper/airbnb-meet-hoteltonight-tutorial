import { authController } from './controller';
import { ResolverMap } from '../../types/graphql-utils';

const resolvers: ResolverMap = {
  Query: {
    hello: () => 'bye',
  },
  Mutation: {
    loginWithEmailAndPassword: (_, args: GQL.ILoginWithEmailAndPasswordOnMutationArguments) =>
      authController._loginWithEmailAndPassword(args.input),
    signup: (_, args: GQL.ISignupOnMutationArguments) => authController._signup(args.input),
  },
};

export default resolvers;
