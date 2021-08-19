import express from "express";
import {
  deleteSingleProduct,
  getAllProductForAdmin,
  postSingleProduct,
  updateSingleProduct,
  updateProductStatus,
  getAllProductForUser,
  getFeatureProductForUser,
  getAllProductForSeller,
} from "../controllers/productController";
import { updateStatusValidation } from "../middlewares/validationHelpers/productStatusUpdateValidation";
import { productValidation } from "../middlewares/validationHelpers/productValidation";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const router = express.Router();

router.get("/all/admin", verifyAuthToken, getAllProductForAdmin);
router.get("/all/seller/:id", verifyAuthToken, getAllProductForSeller);
router.get("/all/user", getAllProductForUser);
router.get("/feature/", getFeatureProductForUser);

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
  "/update/status-isFeatured/:id",
  verifyAuthToken,
  updateStatusValidation,
  updateProductStatus
);

export default router;
