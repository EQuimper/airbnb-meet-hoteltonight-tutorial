import * as Yup from 'yup';
import { IReservationInfo, ReservationModel } from '.';
import { checkValidId } from '../../utils/checkValidId';

export const createReservation = async (info: IReservationInfo, userId: string) => {
  checkValidId(userId);

  const schema = Yup.object().shape({
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
    price: Yup.number().required(),
    total: Yup.number().required(),
    place: Yup.string().required(),
  });

  try {
    await schema.validate(info);

    return ReservationModel.create({
      ...info,
      user: userId,
    });
  } catch (error) {
    throw error;
  }
};

export const cancelReservation = async (id: string, userId: string) => {
  checkValidId(id);
  checkValidId(userId);

  try {
    const reservation = await ReservationModel.findById(id);

    if (!reservation) {
      throw new Error('Reservation not exist');
    }

    if (reservation.user.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    reservation.cancelled = true;

    return reservation.save();
  } catch (error) {
    throw error;
  }
};

export const getReservationById = async (id: string) => {
  checkValidId(id);

  try {
    const reservation = await ReservationModel.findById(id);

    if (!reservation) {
      throw new Error('Reservation not exist');
    }

    return reservation;
  } catch (error) {
    throw error;
  }
};

export const getUserReservations = async (userId: string) => {
  checkValidId(userId);

  try {
    return ReservationModel.find({ user: userId }).sort({ startDate: -1 });
  } catch (error) {
    throw error;
  }
};

export const getPlaceReservations = async (placeId: string) => {
  checkValidId(placeId);

  try {
    return ReservationModel.find({ place: placeId }).sort({ startDate: -1 });
  } catch (error) {
    throw error;
  }
};
