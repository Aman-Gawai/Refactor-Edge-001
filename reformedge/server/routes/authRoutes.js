import express from "express";
import { body } from "express-validator";
import { 
  registerUser, 
  loginUser, 
  logoutUser,
  forgotPassword, 
  resetPassword 
} from "../controllers/authController.js";

const router = express.Router();

// Validation middleware
const loginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

// Auth routes
router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
router.post("/logout", logoutUser);

// Password reset routes
router.post("/forgot-password", 
  body("email").isEmail().withMessage("Invalid email"),
  forgotPassword
);

router.post("/reset-password", [
  body("token").notEmpty().withMessage("Token is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], resetPassword);

export default router;
