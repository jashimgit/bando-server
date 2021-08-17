import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3, max: 56 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6 },
  createdAt: { type: Date, default: new Date() },
});

export default adminSchema;
