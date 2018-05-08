import { RoomModel, createRoom } from '..';
import { UserModel, IUserModel } from '../..';

describe('Room Controller', () => {
  const userData = {
    email: 'hello@gmail.com',
    password: 'password123',
  };

  let user: IUserModel;

  beforeEach(async () => {
    await RoomModel.remove({});
    await UserModel.remove({});

    user = await UserModel.create(userData);
  });

  describe('createRoom', () => {
    test('able to create a room', async () => {
      const roomData = {
        name: 'my room',
        description: 'description',
        bedroom: 2,
        bathroom: 1,
        address: '555 av Will, Quebec',
        price: 150,
        haveInternet: true,
        haveAirCond: true,
        haveHeating: false,
        haveTv: true,
      };

      const room = await createRoom(roomData, user._id);

      expect(room.name).toBe(roomData.name);
      expect(room.description).toBe(roomData.description);
      expect(room.owner).toBe(user._id);
      expect(room.isActive).toBe(true);
    });

    test('throw "haveTv is a required field" if haveTv not provided', async () => {
      const roomData = {
        name: 'my room',
        description: 'description',
        bedroom: 2,
        bathroom: 1,
        address: '555 av Will, Quebec',
        price: 150,
        haveInternet: true,
        haveAirCond: true,
        haveHeating: false,
      };

      try {
        // @ts-ignore
        await createRoom(roomData, user._id);
      } catch (error) {
        expect(error.message).toBe('haveTv is a required field');
      }
    });
  });
});
