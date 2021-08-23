import express from "express";
import {
  handleOrderSubmit,
  getAllOrdersForAdmin,
  getAllOrdersById
} from "../controllers/orderController";
import { orderSchemaValidation } from "../middlewares/validationHelpers/orderSchemaValidition";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const router = express.Router();

router.post(
  "/submit",
  verifyAuthToken,
  orderSchemaValidation,
  handleOrderSubmit
);

router.get("/admin/all", verifyAuthToken, getAllOrdersForAdmin);
router.get("/all/:id", verifyAuthToken, getAllOrdersById);

export default router;
