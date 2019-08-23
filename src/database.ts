import mongoose from 'mongoose';
// import { mongodb } from './keys';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`mongodb://${process.env.DBHOST}/${process.env.DBNAME}`, {
  useNewUrlParser: true,
})
  // tslint:disable-next-line:no-console
  .then((db) => console.log('db is connected'))
  // tslint:disable-next-line:no-console
  .catch((err) => console.log(err))
;
