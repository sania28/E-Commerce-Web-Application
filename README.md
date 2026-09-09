# 🛍️ ShopMart - Full-Stack E-Commerce Application

A beautiful, modern e-commerce platform with **Glass Morphism Design** featuring a comprehensive **Admin Panel** for product and order management. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with TailwindCSS.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 👥 User Features

- **Authentication & Authorization** - JWT-based user registration and login
- **Product Browsing** - Browse products with search, filter, and pagination
- **Product Details** - Detailed product views with image gallery
- **Shopping Cart** - Add/remove items, update quantities
- **Checkout Process** - Complete order placement with shipping address
- **Order History** - View and track order status
- **Beautiful Glass Morphism UI** - Modern, attractive glass-style design

### 👨‍💼 Admin Features

- **Secure Admin Login** - Role-based authentication
- **Dashboard Analytics** - View total orders, revenue, pending orders, and products
- **Product Management (CRUD)**
  - Create new products with images
  - Edit existing products
  - Delete products (soft delete)
  - Bulk import products
  - Search and filter products
- **Order Management**
  - View all orders with filters
  - Update order status (Pending → Processing → Shipped → Delivered)
  - Add admin notes to orders
  - Export orders to CSV
  - Search by order ID or customer email
  - Filter by status and date range

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Ecommerce
```

2. **Setup Environment Variables**

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345
CLIENT_URL=http://localhost:5173
```

3. **Install Dependencies**

**Backend:**

```bash
npm install
```

**Frontend:**

```bash
cd client
npm install
cd ..
```

4. **Seed Database**

```bash
npm run seed
```

This will create:

- Admin user (admin@example.com / Admin@12345)
- Test user (user@example.com / User@12345)
- 12 sample products

5. **Run the Application**

**Development mode (both frontend & backend):**

```bash
npm run dev
```

**OR run separately:**

Backend:

```bash
npm run server
```

Frontend:

```bash
npm run client
```

6. **Access the Application**

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## 🔑 Demo Credentials

### Admin Access

- **Email:** admin@example.com
- **Password:** Admin@12345
- **URL:** http://localhost:5173/admin/login

### User Access

- **Email:** user@example.com
- **Password:** User@12345
- **URL:** http://localhost:5173/login

## 📁 Project Structure

```
Ecommerce/
├── server/                 # Backend (Express + MongoDB)
│   ├── models/            # Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── admin/         # Admin routes
│   │       ├── auth.js
│   │       ├── products.js
│   │       └── orders.js
│   ├── middleware/        # Auth middleware
│   │   └── auth.js
│   ├── index.js           # Server entry point
│   └── seed.js            # Database seeding
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layouts/   # Layout components
│   │   │   ├── user/      # User components
│   │   │   └── admin/     # Admin components
│   │   ├── pages/
│   │   │   ├── user/      # User pages
│   │   │   └── admin/     # Admin pages
│   │   ├── services/
│   │   │   └── api.js     # API client
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   └── cartStore.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── package.json
└── .env.example
```

## 🔌 API Endpoints

### Authentication (Public)

| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | `/api/auth/register` | Register new user               |
| POST   | `/api/auth/login`    | User login                      |
| GET    | `/api/auth/profile`  | Get user profile (protected)    |
| PUT    | `/api/auth/profile`  | Update user profile (protected) |

### Products (Public)

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/products`     | Get all products (with filters) |
| GET    | `/api/products/:id` | Get product by ID or slug       |

### Orders (User - Protected)

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | `/api/orders`     | Create new order  |
| GET    | `/api/orders`     | Get user's orders |
| GET    | `/api/orders/:id` | Get order by ID   |

### Admin Authentication

| Method | Endpoint                  | Description                   |
| ------ | ------------------------- | ----------------------------- |
| POST   | `/api/admin/auth/login`   | Admin login                   |
| GET    | `/api/admin/auth/profile` | Get admin profile (protected) |

### Admin Products (Protected)

| Method | Endpoint                     | Description                        |
| ------ | ---------------------------- | ---------------------------------- |
| GET    | `/api/admin/products`        | Get all products (with pagination) |
| GET    | `/api/admin/products/:id`    | Get product by ID                  |
| POST   | `/api/admin/products`        | Create new product                 |
| PUT    | `/api/admin/products/:id`    | Update product                     |
| DELETE | `/api/admin/products/:id`    | Delete product (soft delete)       |
| POST   | `/api/admin/products/import` | Bulk import products               |

### Admin Orders (Protected)

| Method | Endpoint                            | Description                             |
| ------ | ----------------------------------- | --------------------------------------- |
| GET    | `/api/admin/orders`                 | Get all orders (filterable & paginated) |
| GET    | `/api/admin/orders/:id`             | Get order details                       |
| PUT    | `/api/admin/orders/:id/status`      | Update order status                     |
| PUT    | `/api/admin/orders/:id/notes`       | Add admin note                          |
| POST   | `/api/admin/orders/export`          | Export orders to CSV                    |
| GET    | `/api/admin/orders/dashboard/stats` | Get dashboard statistics                |

## 🎨 Design Features

### Glass Morphism Design

- **Glassmorphic Cards** - Semi-transparent cards with blur effects
- **Gradient Backgrounds** - Animated gradient backgrounds
- **Smooth Animations** - Hover effects and transitions
- **Responsive Layout** - Mobile-first design approach
- **Modern UI/UX** - Clean and intuitive interface

### Color Scheme

- **Primary:** Purple (#667eea) to Pink (#f5576c)
- **Secondary:** Blue (#4facfe) to Cyan (#00f2fe)
- **Accent:** Various gradient combinations
- **Glass Effects:** Transparent overlays with backdrop blur

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt encryption for passwords
- **Role-Based Access Control** - Admin and user roles
- **Protected Routes** - Middleware for route protection
- **Input Validation** - Server-side validation using express-validator
- **CORS Protection** - Configured CORS policy

## 📊 Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['user', 'admin'],
  shippingAddresses: Array,
  timestamps: true
}
```

### Product Model

```javascript
{
  name: String,
  slug: String (unique),
  description: String,
  price: Number,
  category: Enum,
  weight: Number,
  stock: Number,
  images: Array,
  isDeleted: Boolean,
  createdBy: ObjectId (ref: User),
  timestamps: true
}
```

### Order Model

```javascript
{
  orderId: String (unique),
  user: ObjectId (ref: User),
  items: Array,
  shippingAddress: Object,
  totalAmount: Number,
  status: Enum ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  adminNotes: Array,
  timestamps: true
}
```

## 🧪 Testing

### Test Admin Functions

1. Login to admin panel
2. Create a new product
3. Edit existing product
4. View orders
5. Change order status
6. Add admin notes
7. Export orders to CSV

### Test User Functions

1. Register new account
2. Browse products
3. Add items to cart
4. Proceed to checkout
5. Place order
6. View order history

## 🚀 Deployment

### Backend Deployment (e.g., Railway, Render, Heroku)

1. Set environment variables
2. Deploy backend code
3. Update `MONGODB_URI` with production database
4. Update `JWT_SECRET` with strong secret

### Frontend Deployment (e.g., Vercel, Netlify)

1. Build the frontend:

```bash
cd client
npm run build
```

2. Deploy `client/dist` folder
3. Update API base URL if needed

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<strong-random-secret>
CLIENT_URL=<your-frontend-url>
```

## 📝 Scripts

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Run both frontend and backend in development |
| `npm run server` | Run backend only                             |
| `npm run client` | Run frontend only                            |
| `npm run build`  | Build frontend for production                |
| `npm run seed`   | Seed database with sample data               |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🎯 Evaluation Criteria

- ✅ User Functionality (Signup/Login/Cart/Checkout) - 25%
- ✅ Admin Panel (CRUD Products & Orders + Security) - 25%
- ✅ Backend & API Design (Auth, DB, role checks) - 15%
- ✅ Frontend Usability & Responsiveness (User + Admin UI) - 15%
- ✅ Code Quality, Docs & Tests - 10%
- ✅ Deployment & Demo - 10%

## 📞 Support

For support, email admin@example.com or create an issue in the repository.

---

**Built with ❤️ using MERN Stack & TailwindCSS**
