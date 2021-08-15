import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photoUrl: String,
  phone: { type: String, required: true },
  role: { type: String, required: true, enum: ["user", "seller"] },
  createdAt: { type: Date, default: new Date() },
  status: { type: String, default: null },
});


export default userSchema;
