import * as mongoose from 'mongoose';
import { IUserModel } from '..';

export interface INotificationMethod {
  allowed: boolean;
  value: string;
}

export interface ProfileInfo {
  avatar: string;
  isOwner: boolean;
  notifications: {
    sms: INotificationMethod;
    email: INotificationMethod;
    pushNotification: INotificationMethod;
  };
}

export interface IProfileDocument extends mongoose.Document, ProfileInfo {
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfileModel extends IProfileDocument {
  user: string | IUserModel;
}

const NotificationMethod = {
  allowed: {
    type: Boolean,
    default: false,
  },
  value: String,
};

const ProfileSchema = new mongoose.Schema(
  {
    avatar: String,
    isOwner: {
      type: Boolean,
      default: false,
    },
    notifications: {
      sms: NotificationMethod,
      email: NotificationMethod,
      pushNotification: NotificationMethod,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const ProfileModel = mongoose.model<IProfileModel>('Profile', ProfileSchema);
