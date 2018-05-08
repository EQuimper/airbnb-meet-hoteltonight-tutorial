import { ResolverMap } from '../../types/graphql-utils';
import { getRoomById, getOwnerRoom, makeRoomInactive, createRoom } from '.';

const resolvers: ResolverMap = {
  Query: {
    room: (_, args: GQL.IRoomOnQueryArguments) => getRoomById(args.id),
    // @ts-ignore
    getOwnerRoom: (_, args, ctx) => getOwnerRoom(ctx.user!._id),
  },
  Mutation: {
    makeRoomInactive: (_, args: GQL.IMakeRoomInactiveOnMutationArguments, ctx) =>
      makeRoomInactive(args.id, ctx.user!._id),
    createRoom: (_, args: GQL.ICreateRoomOnMutationArguments, ctx) =>
      createRoom(args.input, ctx.user!._id),
  },
};

export default resolvers;
