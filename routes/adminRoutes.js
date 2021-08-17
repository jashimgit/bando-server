import express from "express";
import {
  handleAdminLogin,
  handleMakeAdmin,
} from "../controllers/adminController";
import {
  adminLoginValidation,
  makeAdminValidation,
} from "../middlewares/validationHelpers/adminValidation";
import verifyAdminToken from "../middlewares/verifyAdminToken";

const router = express.Router();

// make admin route handle
router.post(
  "/makeAdmin",
  verifyAdminToken,
  makeAdminValidation,
  handleMakeAdmin
);

// admin login route handle
router.post("/login", adminLoginValidation, handleAdminLogin);

export default router;
