import mongoose from 'mongoose';
import { mongodb } from './keys';

mongoose.connect(mongodb.URI, {
  useNewUrlParser: true,
})
  // tslint:disable-next-line:no-console
  .then((db) => console.log('db is connected'))
  // tslint:disable-next-line:no-console
  .catch((err) => console.log(err))
;
