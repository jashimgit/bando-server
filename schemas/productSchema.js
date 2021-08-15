import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  category: {
    type: [String],
    required: true,
  },
  subCategory: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  images: [{ type: [String], required: true }],
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, default: null },
  height: { type: Number, default: null },
  width: { type: Number, default: null },
  status: { type: String, default: "" },
  cupon: { type: String, default: "" },
  uploadAt: { type: Date, default: new Date() },
});

export default productSchema;
