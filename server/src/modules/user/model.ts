import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { constants } from '../../config/constants';

export interface UserInfo {
  email: string;
  password: string;
}

export interface IUserDocument extends mongoose.Document, UserInfo {
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends IUserDocument {
  _hashPassword(password: string): string;
  _comparePassword(password: string): boolean;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password is not long enough'],
    },
  },
  { timestamps: true },
);

UserSchema.pre<IUserModel>('save', function(next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  next();
});

UserSchema.post('save', (error, _, next) => {
  if (error.name === 'BulkWriteError' && error.code === 11000) {
    return next(new Error('Email must be unique'));
  }

  return next(error);
});

UserSchema.methods = {
  _hashPassword(password: string): string {
    return bcrypt.hashSync(password, constants.SALT_ROUND);
  },
  _comparePassword(this: IUserModel, password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  },
};

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);
