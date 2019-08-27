import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  encryptPassword: (password: string) => string;
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// hash password
userSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

export default mongoose.model<IUser>('User', userSchema);
