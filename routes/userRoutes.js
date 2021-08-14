import express from 'express';

const router = express.Router();
import { handleUserLogin, handleUserSignup } from "../controllers/userController";


// signup route

router.post("/signup", handleUserSignup);


// login route
router.post("/login", handleUserLogin);

export default router;
