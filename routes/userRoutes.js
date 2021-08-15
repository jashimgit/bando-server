import express from "express";
import {
  handleUserLogin,
  handleUserSignup,
} from "../controllers/userController";
import { validateRegister } from "../middlewares/validationHelpers/userValidation";

const router = express.Router();

// signup route

router.post("/signup", validateRegister, handleUserSignup);

// login route
router.post("/login", handleUserLogin);

export default router;
