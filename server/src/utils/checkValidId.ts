import { Types } from 'mongoose';

export const checkValidId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Must be a valid id');
  }
};
