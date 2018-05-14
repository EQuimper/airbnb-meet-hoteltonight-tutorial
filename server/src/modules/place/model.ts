import * as mongoose from 'mongoose';
import { IUserModel } from '../user';

export interface PlaceInfo {
  name: string;
  description?: string | null;
  bedroom: number;
  bathroom: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  price: number;
  haveInternet: boolean;
  haveAirCond: boolean;
  haveTv: boolean;
  haveHeating: boolean;
  isActive?: boolean;
  maxGuest: number;
  petsAllowed: boolean;
  photos: string[];
}

export type PlaceInfoUpdate = Partial<PlaceInfo>;

export interface IPlaceDocument extends mongoose.Document, PlaceInfo {
  createdAt: Date;
  updatedAt: Date;
  owner: IUserModel | string;
}

export interface IPlaceModel extends IPlaceDocument {
  placeholder: string;
}

const PlaceSchema = new mongoose.Schema(
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
    location: {
      address: {
        type: String,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
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
    petsAllowed: {
      type: Boolean,
      required: true,
    },
    photos: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    maxGuest: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const PlaceModel = mongoose.model<IPlaceModel>('Place', PlaceSchema);
