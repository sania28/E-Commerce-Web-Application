# Django REST Framework E-Commerce Backend

Complete REST API backend for the ShopGlass E-Commerce application built with Django REST Framework.

## 🚀 Quick Start

### 1. Activate Virtual Environment

```powershell
.\venv\Scripts\Activate.ps1
```

### 2. Run Migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

### 3. Seed Database

```powershell
python seed.py
```

### 4. Start Server

```powershell
python manage.py runserver
```

API available at: `http://localhost:8000`

## 🔑 Demo Credentials

- **Admin**: admin@example.com / Admin@12345
- **User**: user@example.com / User@12345

## 📚 API Endpoints

### Auth

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/admin/auth/login` - Admin login

### Products

- `GET /api/products/` - List products
- `GET /api/products/{id}` - Get product

### Orders

- `POST /api/orders/` - Create order
- `GET /api/orders/user` - User orders

### Admin

- `POST /api/admin/products` - Create product
- `GET /api/admin/orders` - All orders
- `GET /api/admin/dashboard/stats` - Statistics
