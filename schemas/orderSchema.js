import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Auth" },
  order: {
    type: {
      products: {
        type: [
          {
            sellerId: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: "Auth",
            },
            product: { type: {}, required: true },
          },
        ],
        required: true,
      },
      total: { type: Number, require: true },
      subTotal: { type: Number, require: true },
      shippingCharge: { type: Number, require: true },
      courierInfo: { type: {}, required: true },
    },
    required: true,
  },
  date: { type: Date, default: new Date() },
  complete: { type: Boolean, default: false },
});

export default orderSchema;
