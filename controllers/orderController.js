import { isAdmin, isSeller, sendResponse } from "../helpersFunctions";
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
    if (!orders.length) {
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
export const getAllOrdersByIdForUser = async (req, res) => {
  if (!(req.user._id === req.params.userId || isAdmin(req))) {
    return sendResponse(res, 403, { success: false, message: "Unauthorized" });
  }
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("user", "-password -__v ")
      .populate("products.seller", "-password -__v ");
    if (!orders.length) {
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

// get all order by product id

export const getAllOrdersByProductId = async (req, res) => {
  if (!(isSeller(req) || isAdmin(req))) {
    return sendResponse(res, 403, { success: false, message: "Unauthorized" });
  }

  const { productId } = req.params;
  try {
    const orders = await Order.find({
      "products.product._id": productId,
    })
      .select({ "products.$": 1 })
      .select(
        "total subTotal courierInfo orderItem orderId date  complete status"
      )
      .populate("user", "-password -__v ")
      .populate("products.seller", "-password -__v ");
    if (!orders.length) {
      return sendResponse(res, 404, {
        success: false,
        message: "order not found by id: " + productId,
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

// get all order for specific seller

export const getAllOrdersFroSellerById = async (req, res) => {
  if (!(isSeller(req) || isAdmin(req))) {
    return sendResponse(res, 403, { success: false, message: "Unauthorized" });
  }

  if (isSeller(req)) {
    if (req.user._id !== req.params.sellerId) {
      return sendResponse(res, 403, {
        success: false,
        message: "You ar not validate seller",
      });
    }
  }

  const { sellerId } = req.params;

  try {
    await Order.find({ "products.seller": sellerId })
      .populate("user", "-password -__v ")
      .exec(function (err, orders) {
        // console.log(orders);
        if (err) {
          return sendResponse(res, 404, {
            success: false,
            message: err.message,
          });
        }

        orders = orders.filter(function (order) {
          order.products = order.products.filter(function (product) {
            return product.seller == sellerId;
          });
          // console.log(order.products)
          return order.products.length > 0;
        });

        if (!orders.length) {
          return sendResponse(res, 404, {
            success: false,
            message: "order not found ",
          });
        }
        return sendResponse(res, 200, {
          success: true,
          message: "Total order " + orders.length,
          orders,
        });
      });
  } catch (err) {
    sendResponse(res, 500, { success: false, message: err.message });
  }
};
