import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUserDocument extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUser extends IUserDocument {
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
      minlength: 6,
    },
  },
  { timestamps: true },
);

UserSchema.pre<IUser>('save', function(next) {
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
    return bcrypt.hashSync(password, 10);
  },
  _comparePassword(this: IUser, password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  },
};

export const UserModel = mongoose.model<IUser>('User', UserSchema);
