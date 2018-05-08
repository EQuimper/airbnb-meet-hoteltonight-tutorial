import * as mongoose from 'mongoose';
import { IUserModel, IRoomModel } from '..';

export interface ReservationInfo {
  startDate: Date;
  endDate: Date;
  price: number;
  total: number;
}

export interface IRoomDocument extends mongoose.Document, ReservationInfo {
  createdAt: Date;
  updatedAt: Date;
  user: mongoose.Schema.Types.ObjectId | IUserModel;
  room: mongoose.Schema.Types.ObjectId | IRoomModel;
}

export interface IReservationModel extends IRoomDocument {
  placeholder: string;
}

const ReservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
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
