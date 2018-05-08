import * as Yup from 'yup';

import { PlaceInfo, PlaceModel } from './model';
import { checkValidId } from '../../utils/checkValidId';

export const createPlace = async (info: PlaceInfo, userId: string) => {
  if (userId == null) {
    throw new Error('Owner id is required');
  }

  checkValidId(userId);

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    bedroom: Yup.number().required(),
    bathroom: Yup.number().required(),
    location: Yup.object().shape({
      address: Yup.string().required(),
      lat: Yup.number().required(),
      lng: Yup.number().required(),
    }),
    price: Yup.number().required(),
    haveInternet: Yup.boolean().required(),
    haveAirCond: Yup.boolean().required(),
    haveHeating: Yup.boolean().required(),
    haveTv: Yup.boolean().required(),
    petsAllowed: Yup.boolean().required(),
    isActive: Yup.boolean(),
    maxGuest: Yup.number().required(),
  });

  try {
    await schema.validate(info);

    return PlaceModel.create({
      ...info,
      owner: userId,
    });
  } catch (error) {
    throw error;
  }
};

export const getPlaceById = async (id: string) => {
  if (id == null) {
    throw new Error('Place id is required');
  }

  checkValidId(id);

  try {
    const place = await PlaceModel.findById(id);

    if (!place) {
      throw new Error('Place not exist');
    }

    return place;
  } catch (error) {
    throw error;
  }
};

export const updatePlace = async (placeId: string, info: PlaceInfo, ownerId: string) => {
  if (placeId == null) {
    throw new Error('Place id is required');
  }

  if (ownerId == null) {
    throw new Error('Owner id is required');
  }

  checkValidId(placeId);
  checkValidId(ownerId);

  const schema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    bedroom: Yup.number(),
    bathroom: Yup.number(),
    location: Yup.object().shape({
      address: Yup.string(),
      lat: Yup.number(),
      lng: Yup.number(),
    }),
    price: Yup.number(),
    haveInternet: Yup.boolean(),
    haveAirCond: Yup.boolean(),
    petsAllowed: Yup.boolean(),
    haveHeating: Yup.boolean(),
    haveTv: Yup.boolean(),
    isActive: Yup.boolean(),
    maxGuest: Yup.number(),
  });

  try {
    await schema.validate(info);

    const place = await PlaceModel.findById(placeId);

    if (place) {
      if (place.owner.toString() === ownerId.toString()) {
        (Object.keys(info) as (keyof PlaceInfo)[]).forEach(key => {
          place[key] = info[key];
        });

        return place.save();
      }

      throw new Error('Unauthorized');
    } else {
      throw new Error('Place not exist');
    }
  } catch (error) {
    throw error;
  }
};

export const makePlaceInactive = async (placeId: string, ownerId: string) => {
  if (placeId == null) {
    throw new Error('Place id is required');
  }

  if (ownerId == null) {
    throw new Error('Owner id is required');
  }

  checkValidId(placeId);
  checkValidId(ownerId);

  try {
    const place = await PlaceModel.findById(placeId);

    if (place) {
      if (place.owner.toString() === ownerId.toString()) {
        place.isActive = false;

        return place.save();
      }

      throw new Error('Unauthorized');
    } else {
      throw new Error('Place not exist');
    }
  } catch (error) {
    throw error;
  }
};

export const getOwnerPlaces = async (userId: string) => {
  if (userId == null) {
    throw new Error('Owner id is required');
  }

  checkValidId(userId);

  try {
    return PlaceModel.find({ owner: userId });
  } catch (error) {
    throw error;
  }
};
