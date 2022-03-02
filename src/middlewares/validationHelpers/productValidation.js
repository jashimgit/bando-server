import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string(),
  subCategory: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().empty(""),
  images: Joi.string(),
  price: Joi.number().required(),
  color: Joi.string().empty(""),
  size: Joi.string().empty(""),
  height: Joi.string().empty(""),
  width: Joi.string().empty(""),
  status: Joi.string().valid("pending", "active", "rejected"),
  cupon: Joi.string().empty(""),
  description: Joi.string().required(),
});

export const productValidation = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error)
    return res
      .status(400)
      .send({ name: "Bad Request", message: error.details[0].message });
  next();
};
