import { date } from "joi";
import mongoose from "mongoose";
import models from "../models";

const { Product } = models;

//get all product
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "seller",
      "name email photoUrl createdAt phone -_id"
    );
    if (!products.length) {
      return res.status(404).send({
        name: "Not Fount",
        message: "there is not product in this collection",
      });
    }
    res.status(200).send({
      name: "OK",
      products,
      message: "Total product : " + products.length,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ name: "Internal Server Error", message: error.message });
  }
};

//post a single product
export const postSingleProduct = async (req, res) => {
  //   return res.send({body: req.body, user: req.user.role});
  if (req.user.role !== "seller") {
    return res
      .status(403)
      .send({ name: "Forbidden", message: "only seller can add product" });
  }

  const product = { ...req.body, seller: req.user._id };
  const data = new Product(product);
  try {
    const result = await data.save();
    res
      .status(200)
      .send({ name: "OK", message: "Inserted data id: " + result._id });
  } catch (error) {
    res
      .status(500)
      .send({ name: "Internal Server Error", message: error.message });
  }
};
