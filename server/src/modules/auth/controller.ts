import * as jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import { IUserModel, createUser, getUserByEmail, UserInfo } from '../user';
import { constants } from '../../config/constants';

export const createToken = (user: IUserModel) => jwt.sign({ _id: user._id }, constants.JWT_SECRET);

export const decodeToken = (token: string) => jwt.verify(token, constants.JWT_SECRET);

export const signup = async (info: UserInfo) => {
  try {
    const user = await createUser(info);

    return {
      token: createToken(user),
    };
  } catch (error) {
    throw error;
  }
};

export const loginWithEmailAndPassword = async (info: UserInfo) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string().required(),
  });

  try {
    await schema.validate(info);

    const user = await getUserByEmail(info.email);

    const validPw = user._comparePassword(info.password);

    if (validPw) {
      return {
        token: createToken(user),
      };
    }
    throw new Error('Unauthorized');
  } catch (error) {
    throw error;
  }
};
