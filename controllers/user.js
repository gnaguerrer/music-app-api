import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/user.js';
import { validate } from '../utils/validate.js';
import { createJWT } from '../utils/jwt.js';

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
        delete storedUser.__v;
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

const login = async (req, res) => {
  const data = req?.body;
  if (!data?.email || !data?.password) {
    return res.status(400).json({
      error: true,
      message: 'Data is missing. Unable to log in',
      data: null
    });
  }
  try {
    const user = await User.findOne({ email: data?.email }).exec();
    if (user) {
      const pwd = bcrypt.compareSync(data.password, user.password);
      if (!pwd) {
        return res.status(400).json({
          error: true,
          message: 'Incorrect password.',
          data: null
        });
      }
      const loggedUser = user.toObject();
      delete loggedUser.password;
      delete loggedUser.role;
      delete loggedUser.__v;
      const token = createJWT(user);
      return res.status(200).json({
        message: 'Login successfully',
        data: { user: loggedUser, token }
      });
    }

    return res.status(400).json({
      error: true,
      message: 'User not exists.',
      data: null
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Unable to log in. Try it later',
      data: null
    });
  }
};

const getProfile = async (req, res) => {
  const profileId = req?.params?.profileId;
  if (!mongoose.isValidObjectId(profileId)) {
    return res.status(400).json({
      error: true,
      message: 'Missing or invalid profile id',
      data: null
    });
  }
  try {
    const user = await User.findById(profileId)
      .select({ password: 0, role: 0, __v: 0 })
      .exec();
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Profile not found. Try it later',
        data: null
      });
    }
    return res.status(200).json({
      message: 'Login successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Unable to get user profile. Try it later',
      data: null
    });
  }
};

const updateProfile = async (req, res) => {
  const profileId = req?.params?.profileId;
  if (!mongoose.isValidObjectId(profileId)) {
    return res.status(400).json({
      error: true,
      message: 'Missing or invalid profile id',
      data: null
    });
  }
  try {
    const user = await User.findById(profileId)
      .select({ password: 0, role: 0, __v: 0 })
      .exec();
    if (!user) {
      return res.status(404).json({
        error: true,
        message: 'Profile not found. Try it later',
        data: null
      });
    }
    return res.status(200).json({
      message: 'Login successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Unable to get user profile. Try it later',
      data: null
    });
  }
};

export default {
  signUp,
  login,
  getProfile,
  updateProfile
};
