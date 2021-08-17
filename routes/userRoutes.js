import express from "express";
import { findByUserRole, getAllUsers, getUserById, handleUserLogin, handleUserSignup } from "../controllers/userController";
import { validateLogin, validateRegister } from '../middlewares/validationHelpers/userValidation';







const router = express.Router();

// signup route

router.post("/signup", validateRegister, handleUserSignup);

// login route
router.post("/login", validateLogin, handleUserLogin);


/**
 *  Get all users
 *  /user GET
 *  @return array
 */
router.get("/users",  getAllUsers)

/** 
 * Get user by role  
 * /user/:role
 * @return object
 * 
*/
router.get("/user/:role", findByUserRole)

/**
 *  Get user by id
 *  /user/:id GET
 *  @return array
 */
router.get("/user/:id", getUserById);




export default router;
