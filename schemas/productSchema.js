import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: [String],
  subCategory: String,
  brand: String,
  model: String,
  images: [String],
  price: { type: Number, required: true },
  color: String,
  size: String,
  height: Number,
  width: Number,
  status: String,
  cupon: String,
});

export default productSchema;
