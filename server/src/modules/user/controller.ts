import Yup from 'yup';

import { UserModel } from './model';

class UserController {
  public async _create(info: { email: string; password: string }) {
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
  }

  public async _getByEmail(email: string) {
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
  }
}

export const userController = new UserController();
