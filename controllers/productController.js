import { date } from "joi";
import mongoose from "mongoose";
import { isSeller, sendResponse } from "../helpersFunctions";
import models from "../models";

const { Product } = models;

//get all product
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .select("-status -__v")
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
  //check user or seller
  if (!isSeller(req)) {
    return sendResponse(res, 403, {
      name: "Forbidden",
      success: false,
      message: "only seller can add product",
    });
  }

  const product = { ...req.body, seller: req.user._id };
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
