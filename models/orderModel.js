import schema from "../schemas";
import mongoose from "mongoose";

const Order = mongoose.model("Order", schema.orderSchema);

export default Order;
