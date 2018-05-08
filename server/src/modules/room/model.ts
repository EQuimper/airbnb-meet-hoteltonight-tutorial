import * as mongoose from 'mongoose';
import { IUserModel } from '../user';

export interface RoomInfo {
  name: string;
  description?: string;
  bedroom: number;
  bathroom: number;
  address: string;
  price: number;
  haveInternet: boolean;
  haveAirCond: boolean;
  haveTv: boolean;
  haveHeating: boolean;
  isActive?: boolean;
}

export interface IRoomDocument extends mongoose.Document, RoomInfo {
  createdAt: Date;
  updatedAt: Date;
  owner: mongoose.Schema.Types.ObjectId | IUserModel;
}

export interface IRoomModel extends IRoomDocument {
  placeholder: string;
}

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    bedroom: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    haveTv: {
      type: Boolean,
      required: true,
    },
    haveInternet: {
      type: Boolean,
      required: true,
    },
    haveAirCond: {
      type: Boolean,
      required: true,
    },
    haveHeating: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const RoomModel = mongoose.model<IRoomModel>('Room', RoomSchema);
