import dotenv from 'dotenv';
import path from 'path';

module.exports = async () => {
  dotenv.config({ path: path.resolve(__dirname, 'test.env') });
};
