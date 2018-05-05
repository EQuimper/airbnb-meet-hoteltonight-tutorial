import * as jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import { IUserModel, userController } from '../user';
import constants from '../../config/constants';

class AuthController {
  _createToken(user: IUserModel) {
    return jwt.sign({ _id: user._id }, constants.JWT_SECRET);
  }

  _decodeToken(token: string) {
    return jwt.verify(token, constants.JWT_SECRET);
  }

  async _loginWithEmailAndPassword(info: { email: string; password: string }) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(info);

      const user = await userController._getByEmail(info.email);

      const validPw = user._comparePassword(info.password);

      if (validPw) {
        return {
          token: this._createToken(user),
        };
      }
      throw new Error('Unauthorized');
    } catch (error) {
      throw error;
    }
  }
}

export const authController = new AuthController();
