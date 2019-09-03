import mongoose from 'mongoose';

interface IPhoto extends mongoose.Document {
  title: string;
  description: string;
  imagePath: string;
}

const schema = new mongoose.Schema({
  title: String,
  description: String,
  imagePath: String,
});
// https://github.com/expressjs/multer   for upload
// config https://www.youtube.com/watch?v=OMBwyCNmoPY&t=2781s   at  53.22

export default mongoose.model<IPhoto>('Photo', schema);
