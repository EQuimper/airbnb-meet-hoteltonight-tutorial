import { signup, loginWithEmailAndPassword } from './controller';
import { ResolverMap } from '../../types/graphql-utils';

const resolvers: ResolverMap = {
  Mutation: {
    loginWithEmailAndPassword: (_, args: GQL.ILoginWithEmailAndPasswordOnMutationArguments) =>
      loginWithEmailAndPassword(args.input),
    signup: (_, args: GQL.ISignupOnMutationArguments) => signup(args.input),
  },
};

export default resolvers;
