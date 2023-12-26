import jwt from 'jwt-simple';
import moment from 'moment';
import { jwtSecretKey } from '../utils/jwt.js';

export const auth = (req, res, next) => {
  if (!req.headers?.authorization) {
    return res.status(401).json({
      error: true,
      message: 'User not authenticate',
      data: null
    });
  }

  const token = req.headers.authorization.replace(/['"]/g, '');
  try {
    const payload = jwt.decode(token, jwtSecretKey);

    if (payload.exp <= moment().unix()) {
      return res.status(401).json({
        error: true,
        message: 'Expired token',
        data: null
      });
    }
    req.authUser = payload;
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: 'Invalid token',
      data: null
    });
  }

  next();
};
