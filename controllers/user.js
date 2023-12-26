// const User = require('../models/user');
// import { validate } from '../utils/validate.js';

const signUp = (req, res) => {
  const data = req?.body;

  try {
    // const validation = validate(data);
    // if (validation) {
    // }
  } catch (error) {
    if (error?.name === 'TypeError') {
      return res.status(400).json({
        error: true,
        message: error.message,
        data: null
      });
    }
  }
  return res.status(200).json({
    message: 'SignUp User'
  });
};

export default {
  signUp
};
