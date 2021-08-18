import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Auth" },
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
  status: { type: String, default: "pending" },
  cupon: { type: String, default: "" },
  isFeature: { type: Boolean, default: false },
  uploadAt: { type: Date, default: new Date() },
  description: { type: String, required: true },
});

export default productSchema;
