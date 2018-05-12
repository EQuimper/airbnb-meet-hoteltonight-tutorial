import { graphql } from 'graphql';

import { UserModel } from '../../user';
import { schema } from '../../../graphqlSetup';
import { mockLogin } from '../../../../test/mockLogin';
import { PlaceModel, IPlaceModel } from '../..';

const data = {
  email: 'hello@gmail.com',
  password: 'password123',
};

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
  petsAllowed: true,
};

describe('User Resolvers', () => {
  describe('me', () => {
    beforeEach(async () => {
      await UserModel.remove({});

      await UserModel.create(data);
    });
    test('be able to get info if logged', async () => {
      const ctx = await mockLogin(data);

      const query = `
        query {
          me {
            _id
            email
          }
        }
      `;

      const res = await graphql(schema, query, null, ctx);

      const { me } = res.data!;

      expect(me.email).toBe(data.email);
      expect(typeof me._id).toBe('string');
    });
  });

  describe('places', () => {
    let user;
    let place1: IPlaceModel;
    let place2: IPlaceModel;

    beforeEach(async () => {
      await UserModel.remove({});
      await PlaceModel.remove({});

      user = await UserModel.create(data);

      place1 = await PlaceModel.create({
        ...placeData,
        owner: user._id,
      });

      place2 = await PlaceModel.create({
        ...placeData,
        name: 'place 2',
        owner: user._id,
      });
    });

    test('return all places for current user', async () => {
      const ctx = await mockLogin(data);

      const query = `
        query {
          me {
            _id
            email
            places {
              _id
              name
              owner {
                _id
              }
            }
          }
        }
      `;

      const res = await graphql(schema, query, null, ctx);

      const { places } = res.data!.me;

      expect(places.length).toBe(2);

      expect(places[0].name).toBe(place1.name);
      expect(places[0].owner._id).toBe(place1.owner.toString());

      expect(places[1].name).toBe(place2.name);
      expect(places[1].owner._id).toBe(place2.owner.toString());
    });
  });
});
