import { ResolverMap } from '../../types/graphql-utils';

const resolvers: ResolverMap = {
  Query: {
    hello: () => 'yo',
  },
};

export default resolvers;
