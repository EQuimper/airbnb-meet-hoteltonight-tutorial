import { ResolverMap } from '../../types/graphql-utils';
import { getViewer } from '.';

const resolvers: ResolverMap = {
  Query: {
    // @ts-ignore
    me: (_, args, ctx) => getViewer(ctx.user!._id),
  },
};

export default resolvers;
