import express from "express";
import {
  deleteSingleProduct,
  getAllProductForAdmin,
  postSingleProduct,
  updateSingleProduct,
  updateProductStatus,
  getAllProductForUser,
} from "../controllers/productController";
import { productValidation } from "../middlewares/validationHelpers/productValidation";
import verifyAdminToken from "../middlewares/verifyAdminToken";
import verifyUserToken from "../middlewares/verifyUserToken";

const router = express.Router();

router.get("/all/admin", verifyAdminToken, getAllProductForAdmin);
router.get("/all/user", getAllProductForUser);
router.post("/add", verifyUserToken, productValidation, postSingleProduct);
router.put("/update/:id", verifyUserToken, productValidation, updateSingleProduct);
router.put("/updateStatus/:id", verifyAdminToken, updateProductStatus);
router.delete("/delete/:id", verifyUserToken, deleteSingleProduct);

export default router;
