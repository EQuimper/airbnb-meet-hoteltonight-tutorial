import * as Yup from 'yup';

import { RoomInfo, RoomModel, IRoomModel, IRoomDocument } from './model';
import { checkValidId } from '../../utils/checkValidId';

export const createRoom = async (info: RoomInfo, userId: string) => {
  if (userId == null) {
    throw new Error('Owner id is required');
  }

  checkValidId(userId);

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    bedroom: Yup.number().required(),
    bathroom: Yup.number().required(),
    address: Yup.string().required(),
    price: Yup.number().required(),
    haveInternet: Yup.boolean().required(),
    haveAirCond: Yup.boolean().required(),
    haveHeating: Yup.boolean().required(),
    haveTv: Yup.boolean().required(),
    isActive: Yup.boolean(),
  });

  try {
    await schema.validate(info);

    return RoomModel.create({
      ...info,
      owner: userId,
    });
  } catch (error) {
    throw error;
  }
};

export const getRoomById = async (id: string) => {
  if (id == null) {
    throw new Error('Room id is required');
  }

  checkValidId(id);

  try {
    return RoomModel.findById(id);
  } catch (error) {
    throw error;
  }
};

export const updateRoom = async (roomId: string, info: RoomInfo, ownerId: string) => {
  if (roomId == null) {
    throw new Error('Room id is required');
  }

  if (ownerId == null) {
    throw new Error('Owner id is required');
  }

  checkValidId(roomId);
  checkValidId(ownerId);

  const schema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    bedroom: Yup.number(),
    bathroom: Yup.number(),
    address: Yup.string(),
    price: Yup.number(),
    haveInternet: Yup.boolean(),
    haveAirCond: Yup.boolean(),
    haveHeating: Yup.boolean(),
    haveTv: Yup.boolean(),
    isActive: Yup.boolean(),
  });

  try {
    await schema.validate(info);

    const room = await RoomModel.findById(roomId);

    if (room) {
      if (room.owner.toString() === ownerId) {
        (Object.keys(info) as (keyof RoomInfo)[]).forEach(key => {
          room[key] = info[key];
        });

        return room.save();
      }

      throw new Error('Unauthorized');
    } else {
      throw new Error('Room not exist');
    }
  } catch (error) {
    throw error;
  }
};

export const makeRoomInactive = async (roomId: string, ownerId: string) => {
  if (roomId == null) {
    throw new Error('Room id is required');
  }

  if (ownerId == null) {
    throw new Error('Owner id is required');
  }

  checkValidId(roomId);
  checkValidId(ownerId);

  try {
    const room = await RoomModel.findById(roomId);

    if (room) {
      if (room.owner.toString() === ownerId) {
        room.isActive = false;

        return room.save();
      }

      throw new Error('Unauthorized');
    } else {
      throw new Error('Room not exist');
    }
  } catch (error) {
    throw error;
  }
};

export const getOwnerRoom = async (userId: string) => {
  if (userId == null) {
    throw new Error('Owner id is required');
  }

  checkValidId(userId);

  try {
    return RoomModel.find({ owner: userId });
  } catch (error) {
    throw error;
  }
};
