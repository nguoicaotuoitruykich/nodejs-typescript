// models/User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirm_password: String,
  date_of_birth: Date
});

const User = mongoose.model('User', userSchema);
export default User;
