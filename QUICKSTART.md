# 🚀 Quick Start Guide

Follow these simple steps to get the ShopMart E-Commerce application running:

## Step 1: Install Backend Dependencies

```powershell
npm install
```

## Step 2: Install Frontend Dependencies

```powershell
cd client
npm install
cd ..
```

## Step 3: Make sure MongoDB is running

- If using local MongoDB, start it with: `mongod`
- If using MongoDB Atlas, update the `MONGODB_URI` in `.env` file

## Step 4: Seed the Database

```powershell
npm run seed
```

You should see:

```
✅ MongoDB Connected
🗑️  Cleared existing data
👤 Created admin user: admin@example.com
👤 Created test user: user@example.com
📦 Created 12 products
✨ Database seeding completed successfully!
```

## Step 5: Start the Application

```powershell
npm run dev
```

This will start:

- **Backend** on http://localhost:5000
- **Frontend** on http://localhost:5173

## Step 6: Access the Application

### User Interface

1. Open browser: http://localhost:5173
2. **Register** a new account or **Login** with:
   - Email: `user@example.com`
   - Password: `User@12345`

### Admin Panel

1. Open browser: http://localhost:5173/admin/login
2. Login with:
   - Email: `admin@example.com`
   - Password: `Admin@12345`

## 🎯 What to Test

### User Features ✅

1. Browse products on the homepage
2. Search and filter products
3. View product details
4. Add items to cart
5. Proceed to checkout
6. Place an order
7. View order history

### Admin Features ✅

1. View dashboard statistics
2. Create a new product
3. Edit existing products
4. Delete a product
5. View all orders
6. Change order status
7. Add admin notes
8. Export orders to CSV

## 🐛 Troubleshooting

### MongoDB Connection Error

- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env` file

### Port Already in Use

- Change `PORT` in `.env` file
- Or stop the process using the port

### Dependencies Not Found

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Do the same for `client` folder

## 📱 Screenshots to Capture

1. Homepage with glass morphism design
2. Product listing page
3. Product detail page
4. Shopping cart
5. Checkout page
6. Admin login
7. Admin dashboard
8. Admin products page
9. Admin product form
10. Admin orders page
11. Admin order detail page

## 🎥 Demo Video Points

1. User registration/login
2. Browse and search products
3. Add to cart workflow
4. Complete checkout process
5. Admin login
6. View dashboard stats
7. Create a new product
8. Edit product
9. View orders
10. Change order status
11. Export orders to CSV

---

**Enjoy your Full-Stack E-Commerce Application! 🎉**
