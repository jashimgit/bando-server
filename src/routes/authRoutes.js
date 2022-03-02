import express from "express";
import {
  handleAuthLogin,
  handleAuthSignup,
} from "../controllers/authController";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validationHelpers/authSchemaValidation";

const router = express.Router();

// signup route
router.post("/signup", validateRegister, handleAuthSignup);

// login route
router.post("/login", validateLogin, handleAuthLogin);

export default router;
