import models from "../models";

const { Order } = models;

export const handleOrderSubmit = async (req, res) => {
  const newOrder = new Order({ ...req.body, user: req.user._id });

  const savedOrder = await newOrder.save();

  res.send({ savedOrder });
};
