import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  photoUrl: String,
  phone: String,
  role: { type: String, required: true },
  createdAt: Date,
  status: String,
});

export default userSchema;
