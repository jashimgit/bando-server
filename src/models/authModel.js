import { Types, Schema, model } from "mongoose";

const authSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photoUrl: { type: String, default: null },
  phone: String,
  role: { type: String, required: true, enum: ["user", "seller", "admin"] },
  createdAt: { type: Date, default: new Date() },
  status: String,
  license: String,
});

const Auth = model("Auth", authSchema);

export default Auth;
