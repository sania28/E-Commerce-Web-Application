import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products (public)
router.get("/", async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { isDeleted: false };

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
});

// Get product by ID or slug
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;

    let product;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findOne({ _id: identifier, isDeleted: false });
    } else {
      product = await Product.findOne({ slug: identifier, isDeleted: false });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Server error fetching product" });
  }
});

export default router;
