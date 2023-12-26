import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { validate } from '../utils/validate.js';

const signUp = async (req, res) => {
  let data = req?.body;
  try {
    const validation = validate(data);
    if (validation) {
      const userExist = await User.find({
        $or: [
          { nickname_lower: data.nickname.toLowerCase() },
          {
            email_lower: data.email.toLowerCase()
          }
        ]
      });
      console.log('userExist :>> ', userExist);
      if (userExist?.length) {
        return res.status(400).json({
          error: true,
          message: 'Email or nickname already exist',
          data: null
        });
      }
      const pwd = await bcrypt.hash(data.password, 10);
      data.password = pwd;
      const newUser = new User(data);
      const createdUser = await newUser.save();
      if (createdUser) {
        const storedUser = createdUser.toObject();
        delete storedUser.role;
        delete storedUser.password;
        return res.status(200).json({
          message: 'User created successfully',
          data: storedUser
        });
      }
    }

    return res.status(400).json({
      error: true,
      message: 'Invalid data. Unable to create user. Try it later',
      data: null
    });
  } catch (error) {
    if (error?.name === 'TypeError') {
      return res.status(400).json({
        error: true,
        message: error.message,
        data: null
      });
    }

    return res.status(500).json({
      error: true,
      message: 'Unable to create user. Try it later',
      data: null
    });
  }
};

export default {
  signUp
};
