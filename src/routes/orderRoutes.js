import express from "express";
import {
  handleOrderSubmit,
  getAllOrdersForAdmin,
  getAllOrdersByIdForUser,
  getAllOrdersByProductId,
  getAllOrdersFroSellerById,
  handleOrderSTatusUpdate,
} from "../controllers/orderController";
import {
  orderSchemaValidation,
  orderUpdateSchemaValidation,
} from "../middlewares/validationHelpers/orderSchemaValidition";
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
router.get("/seller/:sellerId", verifyAuthToken, getAllOrdersFroSellerById);
router.put(
  "/update/:orderId",
  verifyAuthToken,
  orderUpdateSchemaValidation,
  handleOrderSTatusUpdate
);

export default router;
