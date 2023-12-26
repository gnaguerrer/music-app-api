import { connect } from 'mongoose';
import 'dotenv/config';

const connection = async () => {
  try {
    await connect(process.env.DATABASE);
    console.log('Connected succesfully to database');
  } catch (error) {
    console.error('Errot at connection', error);
    throw new Error('Unable to connect to database');
  }
};

export default {
  connection
};
