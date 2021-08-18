import express from "express";
import { findByUserRole, getAllUsers } from "../controllers/adminController";
import { getUserById } from "../controllers/userController";
import verifyAuthToken from "../middlewares/verifyAuthToken";

const router = express.Router();

/**
 *  Get all users
 *  /user GET
 *  @return array
 */
//
router.get("/all", verifyAuthToken, getAllUsers);

/**
 *  Get user by id
 *  /user/:id GET
 *  @return array
 */
router.get("/:id", verifyAuthToken, getUserById);

/**
 * Get user by role
 * /user/:role
 * @return object
 *
 */
router.get("/role/:role", verifyAuthToken, findByUserRole);

export default router;
