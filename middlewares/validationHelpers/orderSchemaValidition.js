import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

export const orderSchemaValidation = (req, res, next) => {
  const schema = Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          seller: Joi.objectId().required(),
          product: Joi.object().required(),
        })
      )
      .has(
        Joi.object({
          seller: Joi.objectId().required(),
          product: Joi.object().required(),
        })
      )
      .required(),
    total: Joi.number().required(),
    subTotal: Joi.number().required(),
    courierInfo: Joi.object().required(),
    orderItem: Joi.number().required(),
    user: Joi.objectId().required(),
    orderId: Joi.string().required(),
    status: Joi.string().allow(
      "pending",
      "approved",
      "packaging",
      "shipping",
      "delivered"
    ),
    shippingMethod: Joi.string(),
  });
  const { error } = schema.validate(req.body);

  if (error)
    return res
      .status(400)
      .send({ name: "Bad Request", message: error.details[0].message });
  next();
};

export const orderUpdateSchemaValidation = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string()
      .required()
      .allow("pending", "approved", "packaging", "shipping", "done"),
    pickDate: Joi.date().required(),
  });
  const { error } = schema.validate(req.body);

  if (error)
    return res
      .status(400)
      .send({ name: "Bad Request", message: error.details[0].message });
  next();
};
