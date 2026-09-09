import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();

const seedProducts = [
  {
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    description:
      "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.",
    price: 299.99,
    category: "Electronics",
    weight: 0.25,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    ],
  },
  {
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description:
      "Advanced fitness tracking watch with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Water-resistant up to 50m.",
    price: 249.99,
    category: "Electronics",
    weight: 0.05,
    stock: 75,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    ],
  },
  {
    name: "Classic Leather Jacket",
    slug: "classic-leather-jacket",
    description:
      "Genuine leather jacket with premium finish. Timeless design that never goes out of style. Available in multiple sizes.",
    price: 199.99,
    category: "Clothing",
    weight: 1.2,
    stock: 30,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
  },
  {
    name: "Cotton T-Shirt Pack",
    slug: "cotton-tshirt-pack",
    description:
      "Premium quality 100% cotton t-shirts. Pack of 3 in assorted colors. Comfortable and durable for everyday wear.",
    price: 39.99,
    category: "Clothing",
    weight: 0.4,
    stock: 100,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    ],
  },
  {
    name: "The Art of Programming",
    slug: "art-of-programming",
    description:
      "Comprehensive guide to modern programming practices. Essential reading for developers at all levels.",
    price: 49.99,
    category: "Books",
    weight: 0.8,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
    ],
  },
  {
    name: "Mindfulness & Meditation",
    slug: "mindfulness-meditation",
    description:
      "Learn the art of mindfulness and meditation. Transform your life with daily practices and guided exercises.",
    price: 24.99,
    category: "Books",
    weight: 0.5,
    stock: 45,
    images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"],
  },
  {
    name: "Indoor Plant Set",
    slug: "indoor-plant-set",
    description:
      "Beautiful set of 3 low-maintenance indoor plants. Perfect for home or office. Includes decorative pots.",
    price: 79.99,
    category: "Home & Garden",
    weight: 2.5,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
    ],
  },
  {
    name: "Ceramic Dinnerware Set",
    slug: "ceramic-dinnerware-set",
    description:
      "Elegant 16-piece ceramic dinnerware set. Dishwasher and microwave safe. Modern minimalist design.",
    price: 129.99,
    category: "Home & Garden",
    weight: 5.0,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500",
    ],
  },
  {
    name: "Yoga Mat Pro",
    slug: "yoga-mat-pro",
    description:
      "Professional-grade yoga mat with excellent grip and cushioning. Non-slip surface, eco-friendly materials. Includes carrying strap.",
    price: 59.99,
    category: "Sports",
    weight: 1.0,
    stock: 55,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    ],
  },
  {
    name: "Resistance Bands Set",
    slug: "resistance-bands-set",
    description:
      "Complete set of 5 resistance bands with different strength levels. Perfect for home workouts and physical therapy.",
    price: 34.99,
    category: "Sports",
    weight: 0.6,
    stock: 80,
    images: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500",
    ],
  },
  {
    name: "Educational STEM Kit",
    slug: "educational-stem-kit",
    description:
      "Fun and educational STEM learning kit for kids. Includes multiple projects to build and explore science concepts.",
    price: 69.99,
    category: "Toys",
    weight: 1.5,
    stock: 40,
    images: ["https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500"],
  },
  {
    name: "Organic Coffee Beans",
    slug: "organic-coffee-beans",
    description:
      "Premium organic coffee beans, medium roast. Sourced from sustainable farms. Rich flavor and aroma.",
    price: 18.99,
    category: "Food",
    weight: 0.5,
    stock: 120,
    images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"],
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create admin user
    const admin = new User({
      name: "Admin User",
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: process.env.ADMIN_PASSWORD || "Admin@12345",
      role: "admin",
    });
    await admin.save();
    console.log("👤 Created admin user:", admin.email);

    // Create test user
    const testUser = new User({
      name: "Test User",
      email: "user@example.com",
      password: "User@12345",
      role: "user",
    });
    await testUser.save();
    console.log("👤 Created test user:", testUser.email);

    // Create products
    for (const productData of seedProducts) {
      const product = new Product({
        ...productData,
        createdBy: admin._id,
      });
      await product.save();
    }
    console.log(`📦 Created ${seedProducts.length} products`);

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n📝 Test Credentials:");
    console.log("Admin:");
    console.log("  Email:", admin.email);
    console.log("  Password:", process.env.ADMIN_PASSWORD || "Admin@12345");
    console.log("\nUser:");
    console.log("  Email:", testUser.email);
    console.log("  Password: User@12345");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
