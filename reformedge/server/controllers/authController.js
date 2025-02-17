import User from '../models/User.js'; 
import bcrypt from 'bcryptjs';
import crypto from "crypto";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Forgot Password: Generate token, set expiration, and send reset email
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with this email not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set reset token and expiration (10 minutes)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Prepare reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Configure nodemailer
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Refactor-Edge" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please click on the link to reset your password:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reset Password: Validate token and update password
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ 
      message: "Login successful", 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });
  res.json({ message: "Logged out successfully" });
};
