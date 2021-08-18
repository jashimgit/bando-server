import { date } from "joi";
import mongoose from "mongoose";
import { isSeller, sendResponse } from "../helpersFunctions";
import models from "../models";

const { Product } = models;

//get all product for admin
export const getAllProductForAdmin = async (req, res) => {
  const { user } = req;
  if (user.role !== "admin") {
    return sendResponse(res, 403, {
      name: "Forbidden",
      message: "There is not your access",
      success: false,
    });
  }
  try {
    const products = await Product.find()
      .select(" -__v")
      .populate("seller", "name email photoUrl createdAt phone -_id");
    if (!products.length) {
      return sendResponse(res, 404, {
        name: "Not Fount",
        message: "there is not product in this collection",
      });
    }
    return sendResponse(res, 200, {
      name: "OK",
      products,
      message: "Total product : " + products.length,
    });
  } catch (error) {
    return sendResponse(res, 500, {
      name: "Internal Server Error",
      message: error.message,
    });
  }
};

//get all product for user
export const getAllProductForUser = async (req, res) => {
  try {
    const products = await Product.find({ status: "active" })
      .select(" -__v")
      .populate("seller", "name email photoUrl createdAt phone -_id");
    if (!products.length) {
      return sendResponse(res, 404, {
        name: "Not Fount",
        message: "there is not product in this collection",
      });
    }
    return sendResponse(res, 200, {
      name: "OK",
      products,
      message: "Total product : " + products.length,
    });
  } catch (error) {
    return sendResponse(res, 500, {
      name: "Internal Server Error",
      message: error.message,
    });
  }
};

//post a single product
export const postSingleProduct = async (req, res) => {
  const { user, body } = req;
  //check user or seller
  if (user.role !== "seller") {
    return sendResponse(res, 403, {
      name: "Forbidden",
      success: false,
      message: "only seller can add product",
    });
  }

  const product = { ...body, seller: user._id };
  const data = new Product(product);
  try {
    const result = await data.save();
    return sendResponse(res, 200, {
      name: "OK",
      success: true,
      message: "Inserted data id: " + result._id,
    });
  } catch (error) {
    return sendResponse(res, 500, {
      name: "Internal Server Error",
      message: error.message,
      success: false,
    });
  }
};

// update single product
export const updateSingleProduct = async (req, res) => {
  const id = req.params.id;

  //check user or seller
  // const isSeller = isSellerCheck(req);
  if (!isSeller(req))
    return sendResponse(res, 403, {
      name: "Forbidden",
      success: false,
      message: "only seller can update product",
    });

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, seller: req.user._id },
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return sendResponse(res, 403, {
        name: "Forbidden",
        success: false,
        message: "Shit man! This is not your product.",
      });
    }
    return sendResponse(res, 200, {
      name: "OK",
      success: true,
      message: "update data id: " + updatedProduct._id,
    });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server Error",
      message: err.message,
      success: false,
    });
  }
};

// delete product
export const deleteSingleProduct = async (req, res) => {
  const id = req.params.id;

  //check user or seller
  if (!isSeller(req))
    return sendResponse(res, 403, {
      name: "Forbidden",
      success: false,
      message: "only seller can delete product",
    });

  // delete product
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      seller: req.user._id,
    });

    if (!deletedProduct) {
      return sendResponse(res, 403, {
        name: "Forbidden",
        success: false,
        message: "Oh shit! This is not your product.",
      });
    }
    return sendResponse(res, 200, {
      name: "OK",
      success: true,
      message: "Deleted product id: " + id,
    });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server Error",
      message: err.message,
      success: false,
    });
  }
};

export const updateProductStatus = async (req, res) => {
  const { body, user, params } = req;

  if (user.role !== "admin") {
    return sendResponse(res, 403, {
      name: "Forbidden",
      success: false,
      message: "only admin can do this operation",
    });
  }
  try {
    const result = await Product.updateOne(
      { _id: params.id },
      { status: body.status, isFeature: body.isFeature }
    );
    if (!result)
      return sendResponse(res, 404, {
        name: "Not found",
        success: false,
        message: "Product not found by id:" + req.params.id,
      });

    return sendResponse(res, 200, {
      name: "OK",
      success: true,
      message: "updated product id: " + req.params.id,
    });
  } catch (err) {
    return sendResponse(res, 500, {
      name: "Internal Server error",
      success: false,
      message: err.message,
    });
  }
};
