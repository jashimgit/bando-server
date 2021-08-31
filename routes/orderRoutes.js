import express from "express";
import {
  handleOrderSubmit,
  getAllOrdersForAdmin,
  getAllOrdersByIdForUser,
  getAllOrdersByProductId,
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
router.get("/user/:userId", verifyAuthToken, getAllOrdersByIdForUser);
router.get("/product/:productId", verifyAuthToken, getAllOrdersByProductId);

export default router;
