import { ResolverMap } from '../../types/graphql-utils';

const resolvers: ResolverMap = {
  Query: {
    bye: () => 'hello',
  },
};

export default resolvers;
