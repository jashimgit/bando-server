import express from "express";
import { handleMakeAdmin } from "../controllers/adminController";
import { makeAdminValidation } from "../middlewares/validationHelpers/adminValidation";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const router = express.Router();

// make admin route handle
router.post(
  "/add",
  verifyAuthToken,
  makeAdminValidation,
  handleMakeAdmin
);

// 

export default router;
