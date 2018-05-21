import { graphql } from 'graphql';

import { UserModel, IUserModel } from '../../user';
import { schema } from '../../../graphqlSetup';
import { mockLogin } from '../../../../test/mockLogin';
import { PlaceModel, IPlaceModel } from '../..';
import { placeDemo, userDemo, secondUserDemo } from '../../../../test/fixtures';
import { mongoEnv } from '../../../../test/setup';

describe('Place Resolvers', () => {
  let place: IPlaceModel;

  beforeAll(async () => {
    await mongoEnv.open();
  });

  afterAll(async () => {
    await mongoEnv.close();
  });

  describe('Query', () => {
    describe('place', () => {
      beforeEach(async () => {
        await mongoEnv.reset();
        const user = await UserModel.create(userDemo);

        place = await PlaceModel.create({
          ...placeDemo,
          owner: user._id,
        });
      });

      test('get a place by is id', async () => {
        const query = `
          query {
            place(id: "${place._id}") {
              _id
              name
            }
          }
        `;

        const res = await graphql(schema, query);

        const { place: result } = res.data!;

        expect(result._id).toEqual(place._id.toString());
        expect(result.name).toBe(place.name);
      });

      test('throw "Place not exist" if id provided dont belong to a place', async () => {
        await place.remove();

        const query = `
          query {
            place(id: "${place._id}") {
              _id
              name
            }
          }
        `;

        const res = await graphql(schema, query);

        expect(res.errors![0].message).toBe('Place not exist');
      });

      test('throw "Must be a valid id" if id not a valid ObjectId', async () => {
        const query = `
          query {
            place(id: "123") {
              _id
              name
            }
          }
        `;

        const res = await graphql(schema, query);

        expect(res.errors![0].message).toBe('Must be a valid id');
      });
    });

    describe('getOwnerPlaces', () => {
      let user: IUserModel;

      beforeEach(async () => {
        await mongoEnv.reset();
        user = await UserModel.create(userDemo);

        place = await PlaceModel.create({
          ...placeDemo,
          owner: user._id,
        });
      });

      test('get all owner places only', async () => {
        const jon = await UserModel.create(secondUserDemo);

        await PlaceModel.create({
          ...placeDemo,
          owner: jon._id,
        });

        const ctx = await mockLogin(userDemo);

        const query = `
          query {
            getOwnerPlaces {
              _id
              name
              owner {
                _id
              }
            }
          }
        `;

        const res = await graphql(schema, query, null, ctx);

        const { getOwnerPlaces: result } = res.data!;

        expect(result.length).toBe(1);
        expect(result[0].owner._id).toBe(user._id.toString());
      });
    });
  });
});
