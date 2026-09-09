import express from "express";
import { body, validationResult } from "express-validator";
import Product from "../../models/Product.js";
import { authMiddleware, isAdmin } from "../../middleware/auth.js";

const router = express.Router();

// Get all products (admin view with deleted)
router.get("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const {
      category,
      search,
      page = 1,
      limit = 10,
      includeDeleted = false,
    } = req.query;

    const query = {};

    if (!includeDeleted || includeDeleted === "false") {
      query.isDeleted = false;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
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
    console.error("Admin get products error:", error);
    res.status(500).json({ message: "Server error fetching products" });
  }
});

// Get product by ID
router.get("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    console.error("Admin get product error:", error);
    res.status(500).json({ message: "Server error fetching product" });
  }
});

// Create product
router.post(
  "/",
  authMiddleware,
  isAdmin,
  [
    body("name").trim().notEmpty().withMessage("Product name is required"),
    body("slug").trim().notEmpty().withMessage("Slug is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category").notEmpty().withMessage("Category is required"),
    body("weight")
      .isFloat({ min: 0 })
      .withMessage("Weight must be a positive number"),
    body("stock")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        name,
        slug,
        description,
        price,
        category,
        weight,
        stock,
        images,
      } = req.body;

      // Check if slug already exists
      const existingProduct = await Product.findOne({ slug });
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: "Product with this slug already exists" });
      }

      const product = new Product({
        name,
        slug: slug.toLowerCase(),
        description,
        price,
        category,
        weight,
        stock,
        images: images || [],
        createdBy: req.user._id,
      });

      await product.save();

      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.error("Create product error:", error);
      res.status(500).json({ message: "Server error creating product" });
    }
  }
);

// Update product
router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, slug, description, price, category, weight, stock, images } =
      req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if new slug conflicts with existing product
    if (slug && slug !== product.slug) {
      const existingProduct = await Product.findOne({
        slug,
        _id: { $ne: product._id },
      });
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: "Product with this slug already exists" });
      }
      product.slug = slug.toLowerCase();
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (weight !== undefined) product.weight = weight;
    if (stock !== undefined) product.stock = stock;
    if (images) product.images = images;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error updating product" });
  }
});

// Delete product (soft delete)
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isDeleted = true;
    await product.save();

    res.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error deleting product" });
  }
});

// Bulk import products
router.post("/import", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }

    const imported = [];
    const errors = [];

    for (const productData of products) {
      try {
        const existingProduct = await Product.findOne({
          slug: productData.slug,
        });
        if (existingProduct) {
          errors.push({
            slug: productData.slug,
            error: "Product already exists",
          });
          continue;
        }

        const product = new Product({
          ...productData,
          createdBy: req.user._id,
        });

        await product.save();
        imported.push(product);
      } catch (error) {
        errors.push({ slug: productData.slug, error: error.message });
      }
    }

    res.json({
      message: `Imported ${imported.length} products`,
      imported: imported.length,
      errors: errors.length,
      details: { imported, errors },
    });
  } catch (error) {
    console.error("Bulk import error:", error);
    res.status(500).json({ message: "Server error importing products" });
  }
});

export default router;
