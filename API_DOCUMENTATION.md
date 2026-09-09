# 📡 API Documentation

Complete API reference for ShopMart E-Commerce Platform

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 User Authentication

### Register User

```http
POST /auth/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:** `201 Created`

```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:** `200 OK`

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get User Profile

```http
GET /auth/profile
Headers: Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "shippingAddresses": []
  }
}
```

---

## 📦 Products (Public)

### Get All Products

```http
GET /products?category=Electronics&search=wireless&page=1&limit=12
```

**Query Parameters:**

- `category` (optional): Filter by category
- `search` (optional): Search by name/description
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)

**Response:** `200 OK`

```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Premium Wireless Headphones",
      "slug": "premium-wireless-headphones",
      "description": "High-quality wireless headphones...",
      "price": 299.99,
      "category": "Electronics",
      "weight": 0.25,
      "stock": 50,
      "images": ["https://..."],
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 48,
    "pages": 4
  }
}
```

### Get Product by ID

```http
GET /products/:id
```

**Response:** `200 OK`

```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Premium Wireless Headphones",
    "slug": "premium-wireless-headphones",
    "description": "High-quality wireless headphones...",
    "price": 299.99,
    "category": "Electronics",
    "weight": 0.25,
    "stock": 50,
    "images": ["https://..."],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## 🛒 Orders (User - Protected)

### Create Order

```http
POST /orders
Headers: Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "items": [
    {
      "product": "507f1f77bcf86cd799439011",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response:** `201 Created`

```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439012",
    "orderId": "ORD-lx9p2h-A7K3M",
    "user": "507f1f77bcf86cd799439011",
    "items": [...],
    "shippingAddress": {...},
    "totalAmount": 599.98,
    "status": "Pending",
    "createdAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### Get User Orders

```http
GET /orders
Headers: Authorization: Bearer <token>
```

**Response:** `200 OK`

```json
{
  "orders": [...]
}
```

---

## 🔐 Admin Authentication

### Admin Login

```http
POST /admin/auth/login
```

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```

**Response:** `200 OK`

```json
{
  "message": "Admin login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439010",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

## 🛍️ Admin Products (Protected)

### Get All Products (Admin)

```http
GET /admin/products?category=Electronics&search=wireless&page=1&limit=10
Headers: Authorization: Bearer <admin-token>
```

### Get Product by ID

```http
GET /admin/products/:id
Headers: Authorization: Bearer <admin-token>
```

### Create Product

```http
POST /admin/products
Headers: Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "name": "New Product",
  "slug": "new-product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "weight": 0.5,
  "stock": 100,
  "images": ["https://..."]
}
```

**Response:** `201 Created`

### Update Product

```http
PUT /admin/products/:id
Headers: Authorization: Bearer <admin-token>
```

**Request Body:** (same as create, all fields optional)

### Delete Product

```http
DELETE /admin/products/:id
Headers: Authorization: Bearer <admin-token>
```

**Response:** `200 OK`

```json
{
  "message": "Product deleted successfully",
  "product": {...}
}
```

### Bulk Import Products

```http
POST /admin/products/import
Headers: Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "products": [
    {
      "name": "Product 1",
      "slug": "product-1",
      "description": "...",
      "price": 99.99,
      "category": "Electronics",
      "weight": 0.5,
      "stock": 100,
      "images": ["https://..."]
    }
  ]
}
```

---

## 📋 Admin Orders (Protected)

### Get All Orders

```http
GET /admin/orders?status=Pending&search=ORD-123&page=1&limit=10
Headers: Authorization: Bearer <admin-token>
```

**Query Parameters:**

- `status`: Filter by status
- `search`: Search by order ID or email
- `startDate`: Filter by start date
- `endDate`: Filter by end date
- `page`: Page number
- `limit`: Items per page

**Response:** `200 OK`

```json
{
  "orders": [...],
  "pagination": {...},
  "stats": {
    "totalRevenue": 15999.50,
    "totalOrders": 45
  }
}
```

### Get Dashboard Stats

```http
GET /admin/orders/dashboard/stats
Headers: Authorization: Bearer <admin-token>
```

**Response:** `200 OK`

```json
{
  "totalOrders": 45,
  "pendingOrders": 12,
  "totalRevenue": 15999.50,
  "totalProducts": 48,
  "ordersByStatus": [
    { "_id": "Pending", "count": 12 },
    { "_id": "Processing", "count": 8 },
    { "_id": "Shipped", "count": 15 },
    { "_id": "Delivered", "count": 10 }
  ],
  "recentOrders": [...]
}
```

### Get Order by ID

```http
GET /admin/orders/:id
Headers: Authorization: Bearer <admin-token>
```

### Update Order Status

```http
PUT /admin/orders/:id/status
Headers: Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "status": "Shipped"
}
```

**Valid Statuses:** `Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`

### Add Admin Note

```http
PUT /admin/orders/:id/notes
Headers: Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "note": "Customer requested expedited shipping"
}
```

### Export Orders to CSV

```http
POST /admin/orders/export
Headers: Authorization: Bearer <admin-token>
```

**Request Body:**

```json
{
  "orderIds": ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"]
}
```

**Response:** CSV file download

---

## ❌ Error Responses

### 400 Bad Request

```json
{
  "message": "Invalid input",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "message": "No token provided. Authorization denied."
}
```

### 403 Forbidden

```json
{
  "message": "Forbidden. Admin access required."
}
```

### 404 Not Found

```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "message": "Server error",
  "error": "Error details..."
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Prices are in USD (decimal format)
- Pagination defaults: page=1, limit=10
- JWT tokens expire after 7 days
- All admin endpoints require `role: "admin"`
