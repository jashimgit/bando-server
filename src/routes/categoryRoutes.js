import express from "express";
import {
  getAllCategory,
  getSingleCategoryById,
  postCategory,
  updateCategoryById,
} from "../controllers/categoryController";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const router = express.Router();

// Get all Category route
router.get("/", getAllCategory);

// get single category

router.get("/:id", getSingleCategoryById);

// Add new category
router.post("/", verifyAuthToken, postCategory);

// update category

router.put("/:id", updateCategoryById);

export default router;
