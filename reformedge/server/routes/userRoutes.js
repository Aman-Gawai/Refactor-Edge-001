// server/routes/userRoutes.js
import express from "express";
import { getProfile, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"; // Ensure your auth middleware is working

const router = express.Router();

// Protected route to get user profile
router.get("/profile", protect, getProfile);

// Protected route to update user profile
router.patch("/profile", protect, updateProfile);

export default router;
