// define a schema fo books table on mongodb
import mongoose, { Schema, model} from 'mongoose';

// use a inteface to define a book type, to help validate data of type book when saving to DB
export interface IBook extends mongoose.Document {
  title: string;
  author: string;
  isbn: string;
  imagePath: string;
}

const bookSchema = new Schema({
  title: String,
  author: String,
  isbn: String,
  imagePath: String,
});

// set type IBook for the model using the custom interface
export default model<IBook>('Book', bookSchema);
