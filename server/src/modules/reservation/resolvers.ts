import { ResolverMap } from '../../types/graphql-utils';
import {
  getUserReservations,
  getPlaceReservations,
  getReservationById,
  createReservation,
} from './controller';

const resolvers: ResolverMap = {
  Query: {
    reservation: (_, args: GQL.IReservationOnQueryArguments) =>
      getReservationById(args.reservationId),
    // @ts-ignore
    userReservations: (_, args, ctx) => getUserReservations(ctx.user!._id),
    placeReservations: (_, args: GQL.IPlaceReservationsOnQueryArguments) =>
      getPlaceReservations(args.placeId),
  },

  Mutation: {
    createReservation: (_, args: GQL.ICreateReservationOnMutationArguments, ctx) =>
      createReservation(args.input, ctx.user!._id),
  },
};

export default resolvers;
