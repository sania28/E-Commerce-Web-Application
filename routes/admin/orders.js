import express from "express";
import Order from "../../models/Order.js";
import { authMiddleware, isAdmin } from "../../middleware/auth.js";

const router = express.Router();

// Get all orders with filters
router.get("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const {
      status,
      search,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.$or = [{ orderId: { $regex: search, $options: "i" } }];
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.product", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(query);

    // Calculate statistics
    const stats = await Order.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    res.json({
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
      stats: stats[0] || { totalRevenue: 0, totalOrders: 0 },
    });
  } catch (error) {
    console.error("Admin get orders error:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
});

// Get dashboard statistics
router.get("/dashboard/stats", authMiddleware, isAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    const Product = (await import("../../models/Product.js")).default;
    const totalProducts = await Product.countDocuments({ isDeleted: false });

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalOrders,
      pendingOrders,
      totalRevenue,
      totalProducts,
      ordersByStatus,
      recentOrders,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server error fetching dashboard stats" });
  }
});

// Get order by ID
router.get("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name images")
      .populate("adminNotes.createdBy", "name");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ order });
  } catch (error) {
    console.error("Admin get order error:", error);
    res.status(500).json({ message: "Server error fetching order" });
  }
});

// Update order status
router.put("/:id/status", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Server error updating order status" });
  }
});

// Add admin note
router.put("/:id/notes", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { note } = req.body;

    if (!note || !note.trim()) {
      return res.status(400).json({ message: "Note content is required" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.adminNotes.push({
      note: note.trim(),
      createdBy: req.user._id,
      createdAt: new Date(),
    });

    await order.save();
    await order.populate("adminNotes.createdBy", "name");

    res.json({
      message: "Admin note added successfully",
      order,
    });
  } catch (error) {
    console.error("Add admin note error:", error);
    res.status(500).json({ message: "Server error adding admin note" });
  }
});

// Export orders to CSV
router.post("/export", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { orderIds } = req.body;

    const query =
      orderIds && orderIds.length > 0 ? { _id: { $in: orderIds } } : {};

    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.product", "name")
      .sort({ createdAt: -1 });

    // Generate CSV
    const headers = [
      "Order ID",
      "Customer Name",
      "Customer Email",
      "Total Amount",
      "Status",
      "Items Count",
      "Date",
    ];
    const rows = orders.map((order) => [
      order.orderId,
      order.user?.name || "N/A",
      order.user?.email || "N/A",
      order.totalAmount.toFixed(2),
      order.status,
      order.items.length,
      new Date(order.createdAt).toLocaleDateString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=orders-${Date.now()}.csv`
    );
    res.send(csv);
  } catch (error) {
    console.error("Export orders error:", error);
    res.status(500).json({ message: "Server error exporting orders" });
  }
});

export default router;
