import { PlaceModel, createPlace, getPlaceById } from '..';
import { UserModel, IUserModel } from '../..';

describe('Place Controller', () => {
  const userData = {
    email: 'hello@gmail.com',
    password: 'password123',
  };

  let user: IUserModel;

  beforeEach(async () => {
    await PlaceModel.remove({});
    await UserModel.remove({});

    user = await UserModel.create(userData);
  });

  describe('createPlace', () => {
    test('able to create a place', async () => {
      const placeData = {
        name: 'my place',
        description: 'description',
        bedroom: 2,
        bathroom: 1,
        location: {
          address: '555 av Will, Quebec',
          lat: 50,
          lng: 43,
        },
        price: 150,
        haveInternet: true,
        haveAirCond: true,
        haveHeating: false,
        haveTv: true,
        maxGuest: 3,
      };

      const place = await createPlace(placeData, user._id);

      expect(place.name).toBe(placeData.name);
      expect(place.description).toBe(placeData.description);
      expect(place.bedroom).toBe(placeData.bedroom);
      expect(place.bathroom).toBe(placeData.bathroom);
      expect(place.location).toEqual(placeData.location);
      expect(place.price).toBe(placeData.price);
      expect(place.haveInternet).toBe(placeData.haveInternet);
      expect(place.haveAirCond).toBe(placeData.haveAirCond);
      expect(place.haveHeating).toBe(placeData.haveHeating);
      expect(place.haveTv).toBe(placeData.haveTv);
      expect(place.owner).toBe(user._id);
      expect(place.isActive).toBe(true);
      expect(place.maxGuest).toBe(placeData.maxGuest);
    });

    test('throw "Owner id is required" if userId is not provided', async () => {
      const placeData = {
        name: 'my place',
        description: 'description',
        bedroom: 2,
        bathroom: 1,
        location: {
          address: '555 av Will, Quebec',
          lat: 50,
          lng: 43,
        },
        price: 150,
        haveInternet: true,
        haveAirCond: true,
        haveHeating: false,
        haveTv: true,
        maxGuest: 3,
      };

      try {
        // @ts-ignore
        await createPlace(placeData);
      } catch (error) {
        expect(error.message).toBe('Owner id is required');
      }
    });

    test('throw "Must be a valid id" if userId is a valid id', async () => {
      const placeData = {
        name: 'my place',
        description: 'description',
        bedroom: 2,
        bathroom: 1,
        location: {
          address: '555 av Will, Quebec',
          lat: 50,
          lng: 43,
        },
        price: 150,
        haveInternet: true,
        haveAirCond: true,
        haveHeating: false,
        haveTv: true,
        maxGuest: 3,
      };

      try {
        // @ts-ignore
        await createPlace(placeData, '123');
      } catch (error) {
        expect(error.message).toBe('Must be a valid id');
      }
    });

    test('throw "haveTv is a required field" if haveTv not provided', async () => {
      const placeData = {
        name: 'my place',
        description: 'description',
        bedroom: 2,
        bathroom: 1,
        location: {
          address: '555 av Will, Quebec',
          lat: 50,
          lng: 43,
        },
        price: 150,
        haveInternet: true,
        haveAirCond: true,
        haveHeating: false,
        maxGuest: 3,
      };

      try {
        // @ts-ignore
        await createPlace(placeData, user._id);
      } catch (error) {
        expect(error.message).toBe('haveTv is a required field');
      }
    });
  });

  describe('getPlaceById', () => {
    test('return place by his id', async () => {
      const placeData = {
        name: 'my place',
        description: 'description',
        bedroom: 2,
        bathroom: 1,
        location: {
          address: '555 av Will, Quebec',
          lat: 50,
          lng: 43,
        },
        price: 150,
        haveInternet: true,
        haveAirCond: true,
        haveHeating: false,
        haveTv: true,
        maxGuest: 3,
      };

      const place = await createPlace(placeData, user._id);

      const res = await getPlaceById(place._id);

      expect(res!._id).toEqual(place._id);
      expect(res!.name).toBe(place.name);
    });

    test('throw "Place not exist" if id dont belong to a place', async () => {
      const placeData = {
        name: 'my place',
        description: 'description',
        bedroom: 2,
        bathroom: 1,
        location: {
          address: '555 av Will, Quebec',
          lat: 50,
          lng: 43,
        },
        price: 150,
        haveInternet: true,
        haveAirCond: true,
        haveHeating: false,
        haveTv: true,
        maxGuest: 3,
      };

      const place = await createPlace(placeData, user._id);

      await place.remove();

      try {
        await getPlaceById(place._id);
      } catch (error) {
        expect(error.message).toBe('Place not exist');
      }
    });
  });
});
