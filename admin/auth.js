import express from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../../models/User.js";
import { authMiddleware, isAdmin } from "../../middleware/auth.js";

const router = express.Router();

// Admin Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user || user.role !== "admin") {
        return res
          .status(401)
          .json({ message: "Invalid credentials or insufficient permissions" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid credentials or insufficient permissions" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        message: "Admin login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ message: "Server error during admin login" });
    }
  }
);

// Get Admin Profile
router.get("/profile", authMiddleware, isAdmin, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error("Admin profile error:", error);
    res.status(500).json({ message: "Server error fetching admin profile" });
  }
});

export default router;
