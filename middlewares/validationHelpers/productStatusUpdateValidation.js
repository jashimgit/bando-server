import Joi from "joi";

export const updateStatusValidation = (req, res, next) => {
  const schema = Joi.object({
    status: Joi.string().valid("pending", "active", "rejected").required(),
  });
  const { error } = schema.validate(req.body);

  if (error)
    return res
      .status(400)
      .send({ name: "Bad Request", message: error.details[0].message });
  next();
};
