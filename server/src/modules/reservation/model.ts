import * as mongoose from 'mongoose';
import { IUserModel, IPlaceModel } from '..';

export interface ReservationInfo {
  startDate: Date;
  endDate: Date;
  price: number;
  total: number;
}

export interface IReservationDocument extends mongoose.Document, ReservationInfo {
  createdAt: Date;
  updatedAt: Date;
  user: mongoose.Schema.Types.ObjectId | IUserModel;
  place: mongoose.Schema.Types.ObjectId | IPlaceModel;
}

export interface IReservationModel extends IReservationDocument {
  placeholder: string;
}

const ReservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const ReservationModel = mongoose.model<IReservationModel>('Reservation', ReservationSchema);
