import express from "express";
import { handleOrderSubmit } from "../controllers/orderController";
import { orderSchemaValidation } from "../middlewares/validationHelpers/orderSchemaValidition";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const router = express.Router();

router.post(
  "/submit",
  verifyAuthToken,
  orderSchemaValidation,
  handleOrderSubmit
);

export default router;
