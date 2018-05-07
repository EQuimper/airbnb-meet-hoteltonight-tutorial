import { Express } from 'express';
import { decodeToken } from '../modules/auth';

export const middlewares = (app: Express) => {
  // @ts-ignore
  app.use(async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (typeof token === 'string') {
        const [, authToken] = token.split(' ');

        const user = await decodeToken(authToken);

        // @ts-ignore
        req.user = user;
      } else {
        // @ts-ignore
        req.user = null;
      }

      return next();
    } catch (error) {
      // @ts-ignore
      req.user = null;

      return next();
    }
  });
};
