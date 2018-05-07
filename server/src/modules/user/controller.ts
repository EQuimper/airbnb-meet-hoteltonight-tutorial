import * as Yup from 'yup';

import { UserModel, UserInfo } from './model';
import { checkValidId } from '../../utils/checkValidId';

export const createUser = async (info: UserInfo) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
  });

  try {
    await schema.validate(info);
    return UserModel.create(info);
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
  });

  try {
    await schema.validate({ email });
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('User not exist');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const getViewer = async (id: string) => {
  checkValidId(id);

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error('User not exist');
    }

    return user;
  } catch (error) {
    throw error;
  }
};
