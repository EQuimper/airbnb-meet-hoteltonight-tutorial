import * as faker from 'faker';

import { PlaceModel } from './model';
import { UserModel } from '../';

export const createMockPlaces = async (numOfPlaces: number) => {
  const users = await UserModel.find({});

  for (let i = 0; i < numOfPlaces; i++) {
    await PlaceModel.create({
      name: faker.company.companyName(),
      description: faker.company.catchPhraseDescriptor(),
      bedroom: faker.random.number(5),
      bathroom: faker.random.number(5),
      location: {
        address: faker.address.streetAddress(),
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
      price: faker.commerce.price(100, 500),
      haveInternet: faker.random.boolean(),
      haveAirCond: faker.random.boolean(),
      haveTv: faker.random.boolean(),
      haveHeating: faker.random.boolean(),
      petsAllowed: faker.random.boolean(),
      maxGuest: faker.random.number(10),
      photos: Array.from({ length: faker.random.number(10) }).map(() => faker.image.nightlife()),
      owner: users[users.length - 1]._id,
    });
  }
};
