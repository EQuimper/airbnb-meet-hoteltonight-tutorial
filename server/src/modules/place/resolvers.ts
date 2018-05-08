import { ResolverMap } from '../../types/graphql-utils';
import { getPlaceById, getOwnerPlaces, makePlaceInactive, createPlace } from '.';
import { UserModel } from '..';

const resolvers: ResolverMap = {
  Place: {
    owner: ({ owner }) => UserModel.findById(owner),
  },
  Query: {
    place: (_, args: GQL.IPlaceOnQueryArguments) => getPlaceById(args.id),
    // @ts-ignore
    getOwnerPlaces: (_, args, ctx) => getOwnerPlaces(ctx.user!._id),
  },
  Mutation: {
    makePlaceInactive: (_, args: GQL.IMakePlaceInactiveOnMutationArguments, ctx) =>
      makePlaceInactive(args.id, ctx.user!._id),
    createPlace: (_, args: GQL.ICreatePlaceOnMutationArguments, ctx) =>
      createPlace(args.input, ctx.user!._id),
  },
};

export default resolvers;
