import {
  createPlace,
  getPlaceById,
  makePlaceInactive,
  IPlaceModel,
  getOwnerPlaces,
  updatePlace,
} from '..';
import { UserModel, IUserModel } from '../..';
import * as mongoose from 'mongoose';
import { userDemo, secondUserDemo, placeDemo } from '../../../../test/fixtures';

let user: IUserModel;
let jon: IUserModel;

describe('Place Controller', () => {
  describe('createPlace', () => {
    beforeEach(async () => {
      await mongoose.connection.dropDatabase();

      user = await UserModel.create(userDemo);
      jon = await UserModel.create(secondUserDemo);
    });

    test('able to create a place', async () => {
      const place = await createPlace(placeDemo, user._id);

      expect(place.name).toBe(placeDemo.name);
      expect(place.description).toBe(placeDemo.description);
      expect(place.bedroom).toBe(placeDemo.bedroom);
      expect(place.bathroom).toBe(placeDemo.bathroom);
      expect(place.location).toEqual(placeDemo.location);
      expect(place.price).toBe(placeDemo.price);
      expect(place.haveInternet).toBe(placeDemo.haveInternet);
      expect(place.haveAirCond).toBe(placeDemo.haveAirCond);
      expect(place.haveHeating).toBe(placeDemo.haveHeating);
      expect(place.haveTv).toBe(placeDemo.haveTv);
      expect(place.owner).toBe(user._id);
      expect(place.isActive).toBe(true);
      expect(place.maxGuest).toBe(placeDemo.maxGuest);
      expect(place.petsAllowed).toBe(placeDemo.petsAllowed);
    });

    test('throw "Owner id is required" if userId is not provided', async () => {
      try {
        // @ts-ignore
        await createPlace(placeDemo);
      } catch (error) {
        expect(error.message).toBe('Owner id is required');
      }
    });

    test('throw "Must be a valid id" if userId is a valid id', async () => {
      try {
        // @ts-ignore
        await createPlace(placeDemo, '123');
      } catch (error) {
        expect(error.message).toBe('Must be a valid id');
      }
    });

    test('throw "haveTv is a required field" if haveTv not provided', async () => {
      const data = { ...placeDemo, haveTv: undefined };

      try {
        // @ts-ignore
        await createPlace(data, user._id);
      } catch (error) {
        expect(error.message).toBe('haveTv is a required field');
      }
    });
  });

  describe('getPlaceById', () => {
    beforeEach(async () => {
      await mongoose.connection.dropDatabase();

      user = await UserModel.create(userDemo);
      jon = await UserModel.create(secondUserDemo);
    });

    test('return place by his id', async () => {
      const place = await createPlace(placeDemo, user._id);

      const res = await getPlaceById(place._id);

      expect(res!._id).toEqual(place._id);
      expect(res!.name).toBe(place.name);
    });

    test('throw "Place id is required" if no id provided', async () => {
      try {
        // @ts-ignore
        await getPlaceById();
      } catch (error) {
        expect(error.message).toBe('Place id is required');
      }
    });

    test('throw "Place not exist" if id dont belong to a place', async () => {
      const place = await createPlace(placeDemo, user._id);

      await place.remove();

      try {
        await getPlaceById(place._id);
      } catch (error) {
        expect(error.message).toBe('Place not exist');
      }
    });
  });

  describe('makePlaceInactive', () => {
    beforeEach(async () => {
      await mongoose.connection.dropDatabase();

      user = await UserModel.create(userDemo);
      place = await createPlace(placeDemo, user._id);
      jon = await UserModel.create(secondUserDemo);
    });

    let place: IPlaceModel;

    test('able to make a place inactive if owner', async () => {
      expect(place.isActive).toBe(true);

      const res = await makePlaceInactive(place._id, user._id);

      expect(res._id).toEqual(place._id);
      expect(res.isActive).toBe(false);
    });

    test('throw "Unauthorized" if try to make place inactive but wrong author', async () => {
      try {
        await makePlaceInactive(place._id, jon._id);
      } catch (error) {
        expect(error.message).toBe('Unauthorized');
      }
    });

    test('throw "Place not exist" if id dont belongs a place', async () => {
      await place.remove();

      try {
        await makePlaceInactive(place._id, user._id);
      } catch (error) {
        expect(error.message).toBe('Place not exist');
      }
    });

    test('throw "Place id is required" if no place id provided', async () => {
      try {
        // @ts-ignore
        await makePlaceInactive(undefined, user._id);
      } catch (error) {
        expect(error.message).toBe('Place id is required');
      }
    });

    test('throw "Owner id is required" if no owner id provided', async () => {
      try {
        // @ts-ignore
        await makePlaceInactive(place._id);
      } catch (error) {
        expect(error.message).toBe('Owner id is required');
      }
    });
  });

  describe('getOwnerPlaces', () => {
    beforeEach(async () => {
      await mongoose.connection.dropDatabase();

      user = await UserModel.create(userDemo);
      jon = await UserModel.create(secondUserDemo);

      await createPlace(placeDemo, user._id);
      await createPlace(placeDemo, user._id);
      await createPlace(placeDemo, jon._id);
    });

    test('return all places belongs a user', async () => {
      const res = await getOwnerPlaces(user._id);

      expect(res.length).toBe(2);
      expect(res[0].owner).toEqual(user._id);
      expect(res[1].owner).toEqual(user._id);
    });

    test('throw "Owner id is required" if owner id not provided', async () => {
      try {
        // @ts-ignore
        await getOwnerPlaces();
      } catch (error) {
        expect(error.message).toBe('Owner id is required');
      }
    });
  });

  describe('updatePlace', () => {
    let place: IPlaceModel;
    const data = {
      name: 'my new name',
      price: 300,
      haveInternet: false,
      haveAirCond: false,
    };

    beforeEach(async () => {
      await mongoose.connection.dropDatabase();

      user = await UserModel.create(userDemo);
      jon = await UserModel.create(secondUserDemo);
      place = await createPlace(placeDemo, user._id);
    });

    test('able to update place if owner', async () => {
      const res = await updatePlace(place._id, data, user._id);

      expect(res._id).toEqual(place._id);
      expect(res.owner).toEqual(place.owner);
      expect(res.name).toBe(data.name);
      expect(res.description).toBe(place.description);
      expect(res.toJSON().location).toEqual(place.toJSON().location);
      expect(res.price).toBe(data.price);
      expect(res.haveInternet).toBe(data.haveInternet);
      expect(res.haveAirCond).toBe(data.haveAirCond);
    });

    test('throw "Unauthorized" if update without being the owner', async () => {
      try {
        await updatePlace(place._id, data, jon._id);
      } catch (error) {
        expect(error.message).toBe('Unauthorized');
      }
    });

    test('throw "Place not exist" if place id dont belong to a place', async () => {
      await place.remove();
      try {
        await updatePlace(place._id, data, user._id);
      } catch (error) {
        expect(error.message).toBe('Place not exist');
      }
    });

    test('throw "Place id is required" if place id not provided', async () => {
      try {
        // @ts-ignore
        await updatePlace(undefined, data, user._id);
      } catch (error) {
        expect(error.message).toBe('Place id is required');
      }
    });

    test('throw "Owner id is required" if owner id not provided', async () => {
      try {
        // @ts-ignore
        await updatePlace(place._id, data);
      } catch (error) {
        expect(error.message).toBe('Owner id is required');
      }
    });
  });
});
