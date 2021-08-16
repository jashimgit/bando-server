import Joi from "joi";

export const validateRegister = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6),
    photoUrl: Joi.string(),
    phone: Joi.string().required(),
    role: Joi.string().required(),
    status: Joi.string(),
    licence: Joi.string(),
  });

  const { error } = schema.validate(data);

  if (error) {
    const message = error.details[0].message;
    return res
      .status(400)
      .send({ message: message, name: "Bad Request", success: false });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const data = req.body;

  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    const message = error.details[0].message;
    return res
      .status(400)
      .send({ message: message, name: "Sorry Email or password not valid" });
  }
  next();
};
