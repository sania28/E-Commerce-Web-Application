import express from "express";
import { body, validationResult } from "express-validator";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create order
router.post(
  "/",
  authMiddleware,
  [
    body("items")
      .isArray({ min: 1 })
      .withMessage("Order must have at least one item"),
    body("shippingAddress")
      .isObject()
      .withMessage("Shipping address is required"),
    body("shippingAddress.fullName")
      .notEmpty()
      .withMessage("Full name is required"),
    body("shippingAddress.phone").notEmpty().withMessage("Phone is required"),
    body("shippingAddress.address")
      .notEmpty()
      .withMessage("Address is required"),
    body("shippingAddress.city").notEmpty().withMessage("City is required"),
    body("shippingAddress.state").notEmpty().withMessage("State is required"),
    body("shippingAddress.zipCode")
      .notEmpty()
      .withMessage("Zip code is required"),
    body("shippingAddress.country")
      .notEmpty()
      .withMessage("Country is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { items, shippingAddress } = req.body;

      // Validate and calculate total
      let totalAmount = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await Product.findById(item.product);

        if (!product || product.isDeleted) {
          return res
            .status(400)
            .json({ message: `Product ${item.product} not found` });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
          });
        }

        orderItems.push({
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.images[0] || "",
        });

        totalAmount += product.price * item.quantity;

        // Update stock
        product.stock -= item.quantity;
        await product.save();
      }

      const order = new Order({
        user: req.user._id,
        items: orderItems,
        shippingAddress,
        totalAmount,
        status: "Pending",
      });

      await order.save();
      await order.populate("user", "name email");

      res.status(201).json({
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({ message: "Server error creating order" });
    }
  }
);

// Get user's orders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name images");

    res.json({ orders });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
});

// Get order by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name images");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Users can only view their own orders
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ order });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ message: "Server error fetching order" });
  }
});

export default router;
