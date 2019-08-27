import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  encryptPassword: (password: string) => string;
  comparePassword: (password: string) => boolean;
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

userSchema.methods.comparePassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
