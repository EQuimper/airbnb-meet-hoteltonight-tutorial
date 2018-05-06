import { ResolverMap } from '../../types/graphql-utils';

const resolvers: ResolverMap = {
  Query: {
    /* istanbul ignore next line */
    bye: () => 'hello',
  },
};

export default resolvers;
