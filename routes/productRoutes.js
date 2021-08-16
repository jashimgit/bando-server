import express from "express";
import {
  deleteSingleProduct,
  getAllProduct,
  postSingleProduct,
  updateSingleProduct,
} from "../controllers/productController";
import { productValidation } from "../middlewares/validationHelpers/productValidation";
import verifyUserToken from "../middlewares/verifyUserToken";

const router = express.Router();

router.get("/all", getAllProduct);
router.post("/", verifyUserToken, productValidation, postSingleProduct);
router.put("/:id", verifyUserToken, productValidation, updateSingleProduct);
router.delete("/:id", verifyUserToken, deleteSingleProduct);

export default router;
