import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Auth" },
  products: {
    type: [
      {
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Auth",
        },
        product: { type: {}, required: true },
        status: { type: String, default: "pending" },
        pickDate: { type: Date },
      },
    ],
    required: true,
  },
  orderItem: Number,
  total: { type: Number, require: true },
  subTotal: { type: Number, require: true },
  courierInfo: { type: {}, required: true },
  date: { type: Date, default: new Date() },
  complete: { type: Boolean, default: false },
  orderId: { type: String, required: true },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "packaging", "shipping", "delivered"],
  },
  shippingMethod: { type: String, default: "" },
  pickDate: { type: Date, default: null },
});

export default orderSchema;
