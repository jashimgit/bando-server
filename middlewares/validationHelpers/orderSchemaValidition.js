import Joi from "joi";

export const orderSchemaValidation = (req, res, next) => {
  const schema = Joi.object({
    order: Joi.object({
      products: Joi.array()
        .items(
          Joi.object({
            sellerId: Joi.string().required(),
            product: Joi.object().required(),
          })
        )
        .has(
          Joi.object({
            sellerId: Joi.string().required(),
            product: Joi.object().required(),
          })
        )
        .required(),
      total: Joi.number().required(),
      subTotal: Joi.number().required(),
      shippingCharge: Joi.number().required(),
      courierInfo: Joi.object().required(),
    }).required(),
  });
  const { error } = schema.validate(req.body);

  if (error)
    return res
      .status(400)
      .send({ name: "Bad Request", message: error.details[0].message });
  next();
};
