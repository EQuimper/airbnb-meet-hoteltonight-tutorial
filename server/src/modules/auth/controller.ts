import * as jwt from 'jsonwebtoken';

import { IUserModel } from '../user';
import constants from '../../config/constants';

class AuthController {
  _createToken(user: IUserModel) {
    return jwt.sign({ _id: user._id }, constants.JWT_SECRET);
  }
}

export const authController = new AuthController();
