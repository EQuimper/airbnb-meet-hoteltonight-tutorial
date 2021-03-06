import * as mongoose from 'mongoose';
import { IUserModel, IPlaceModel } from '..';

export interface IReservationInfo {
  startDate: Date;
  endDate: Date;
  price: number;
  total: number;
  place: string | IPlaceModel;
}

export interface IReservationDocument extends mongoose.Document, IReservationInfo {
  createdAt: Date;
  updatedAt: Date;
}

export interface IReservationModel extends IReservationDocument {
  placeholder: string;
  cancelled: boolean;
  user: string | IUserModel;
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
    cancelled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

ReservationSchema.index({ user: 1 }, { background: false });
ReservationSchema.index({ place: 1 }, { background: false });

export const ReservationModel = mongoose.model<IReservationModel>('Reservation', ReservationSchema);
