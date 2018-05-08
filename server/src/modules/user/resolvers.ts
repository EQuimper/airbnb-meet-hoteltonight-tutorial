import { ResolverMap } from '../../types/graphql-utils';
import { getViewer } from '.';
import { getOwnerRoom } from '..';

const resolvers: ResolverMap = {
  User: {
    rooms: ({ _id }) => getOwnerRoom(_id),
  },
  Query: {
    // @ts-ignore
    me: (_, args, ctx) => getViewer(ctx.user!._id),
  },
};

export default resolvers;
