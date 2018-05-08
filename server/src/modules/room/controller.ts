import * as Yup from 'yup';

import { RoomInfo, RoomModel } from './model';

export const createRoom = async (info: RoomInfo, userId: string) => {
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
