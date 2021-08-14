import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: [{ type: String, lowercase: true, required: true }],
  subCategory: String,
  brand: String,
  model: String,
  images: [{ type: String, lowercase: true, required: true }],
  price: { type: Number, required: true },
  color: String,
  size: String,
  height: Number,
  width: Number,
  status: String,
  cupon: String,
});

export default productSchema;
