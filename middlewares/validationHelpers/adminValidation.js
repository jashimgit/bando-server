import Joi from "joi";
import { sendResponse } from "../../helpersFunctions";

export const makeAdminValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(56),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return sendResponse(res, 400, {
      name: "Bad Request",
      message: error.details[0].message,
      success: false,
    });

  next();
};

export const adminLoginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return sendResponse(res, 400, {
      name: "Bad Request",
      message: error.details[0].message,
      success: false,
    });
  next();
};
