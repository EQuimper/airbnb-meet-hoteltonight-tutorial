import { ResolverMap } from '../../types/graphql-utils';
import { getViewer } from '.';
import { getOwnerPlaces } from '..';
import { GraphQLDateTime } from 'graphql-iso-date';

// @ts-ignore
const resolvers: ResolverMap = {
  Date: GraphQLDateTime,
  User: {
    places: ({ _id }) => getOwnerPlaces(_id),
  },
  Query: {
    // @ts-ignore
    me: (_, args, ctx) => getViewer(ctx.user!._id),
  },
};

export default resolvers;
