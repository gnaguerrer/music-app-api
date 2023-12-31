import jwt from 'jwt-simple';
import moment from 'moment';

export const jwtSecretKey = 'SECRET_KEY';

export const createJWT = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nickname: user.nickname,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  };

  return jwt.encode(payload, jwtSecretKey);
};
