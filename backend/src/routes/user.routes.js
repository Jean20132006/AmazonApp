import { Router } from 'express';
import { registerUser, loginUser, logoutuser, getProfile } from "../controllers/user.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
//password: tsanga
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutuser);
router.route("/profile").get(authMiddleware, getProfile); // Token verification API

export default router;