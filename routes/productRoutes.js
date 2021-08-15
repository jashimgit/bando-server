import express from "express";
import {
  getAllProduct,
  postSingleProduct,
} from "../controllers/productController";
import { productValidation } from "../middlewares/validationHelpers/productValidation";
import verifyUserToken from "../middlewares/verifyUserToken";

const router = express.Router();

router.get("/", getAllProduct);
router.post("/", verifyUserToken, productValidation, postSingleProduct);
// router.put('/:id', updateSingleProduct);
// router.delete('/:id', deleteSingleProduct);

export default router;
