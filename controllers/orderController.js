import { isAdmin, sendResponse } from "../helpersFunctions";
import models from "../models";

const { Order } = models;

// submit single order
export const handleOrderSubmit = async (req, res) => {
  const newOrder = new Order({ ...req.body });
  try {
    let savedOrder = await newOrder
      .save()
      .then((newOrder) =>
        newOrder
          .populate("user", "-password -__v ")
          .populate("products.seller", "-password -__v ")
          .execPopulate()
      );
    return sendResponse(res, 200, {
      success: true,
      message: "order add successfully1",
      savedOrder,
    });
  } catch (err) {
    sendResponse(res, 500, { success: false, message: err.message });
  }
};

// get all order for admin
export const getAllOrdersForAdmin = async (req, res) => {
  if (!isAdmin(req)) {
    return sendResponse(res, 403, { success: false, message: "Unauthorized" });
  }
  try {
    const orders = await Order.find()
      .populate("user", "-password -__v ")
      .populate("products.seller", "-password -__v ");
    if (!orders) {
      return sendResponse(res, 404, {
        success: false,
        message: "order not found",
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Total order" + orders.length,
      orders,
    });
  } catch (err) {
    sendResponse(res, 500, { success: false, message: err.message });
  }
};

// all orders by id only for user and admin
export const getAllOrdersById = async (req, res) => {
  if (!(req.user._id === req.params.id || isAdmin(req))) {
    return sendResponse(res, 403, { success: false, message: "Unauthorized" });
  }
  try {
    const orders = await Order.find({ user: req.params.id })
      .populate("user", "-password -__v ")
      .populate("products.seller", "-password -__v ");
    if (!orders) {
      return sendResponse(res, 404, {
        success: false,
        message: "order not found",
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Total order" + orders.length,
      orders,
    });
  } catch (err) {
    sendResponse(res, 500, { success: false, message: err.message });
  }
};
