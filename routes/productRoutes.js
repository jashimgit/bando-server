import express from "express";
import {
  deleteSingleProduct,
  getAllProductForAdmin,
  postSingleProduct,
  updateSingleProduct,
  updateProductStatus,
  getAllProductForUser,
} from "../controllers/productController";
import { updateStatusValidation } from "../middlewares/validationHelpers/productStatusUpdateValidation";
import { productValidation } from "../middlewares/validationHelpers/productValidation";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const router = express.Router();

router.get("/all/admin", verifyAuthToken, getAllProductForAdmin);
router.get("/all/user", getAllProductForUser);

// only seller can add, update, product
router.post("/add", verifyAuthToken, productValidation, postSingleProduct);
router.put(
  "/update/:id",
  verifyAuthToken,
  productValidation,
  updateSingleProduct
);

// seller and admin can delete product
router.delete("/delete/:id", verifyAuthToken, deleteSingleProduct);

// only admin can dot this admin
router.put(
  "/updateStatus/:id",
  verifyAuthToken,
  updateStatusValidation,
  updateProductStatus
);

export default router;
