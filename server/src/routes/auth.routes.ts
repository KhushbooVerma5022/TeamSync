import express from "express";
import AuthController from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();
 
router.post("/register", AuthController.createUser);
router.post("/login", AuthController.loginUser);
router.get("/me", authMiddleware, AuthController.getMe);
router.post("/logout", AuthController.logoutUser);

export default router;