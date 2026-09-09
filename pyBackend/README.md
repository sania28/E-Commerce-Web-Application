# Django REST Framework E-Commerce Backend

## Setup Complete

### Structure Created:

```
pyBackend/
├── venv/                       # Python virtual environment
├── ecommerce_api/              # Django project
│   ├── settings.py            # Configured with DRF, JWT, CORS, MongoDB
│   └── urls.py
├── users/                      # User authentication app
│   ├── models.py              # User & ShippingAddress models
│   ├── serializers.py         # User serializers
│   └── views.py               # Auth views (register, login, admin login)
├── products/                   # Products app
│   ├── models.py              # Product model
│   └── serializers.py         # Product serializers
├── orders/                     # Orders app
│   ├── models.py              # Order, OrderItem, AdminNote models
│   └── serializers.py         # Order serializers
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables
└── manage.py

```

### Dependencies Installed:

✅ Django 5.0.1
✅ Django REST Framework 3.14.0
✅ SimpleJWT (JWT Authentication)
✅ CORS Headers
✅ PyMongo (MongoDB)
✅ BCrypt (Password Hashing)
✅ Pillow (Image handling)
✅ Python Decouple (Environment variables)

### Models Created:

#### User Model (Custom)

- Email (unique)
- Name
- Role (user/admin)
- Password (hashed)
- Timestamps

#### Product Model

- Name, Slug, Description
- Price, Category, Weight, Stock
- Images (JSON array)
- Soft delete support
- Timestamps

#### Order Model

- Auto-generated Order ID
- User reference
- Total amount
- Status (Pending, Processing, Shipped, Delivered, Cancelled)
- Shipping address (JSON)
- Order items
- Admin notes
- Timestamps

### Configuration Done:

✅ JWT Authentication (7-day access token)
✅ CORS configured for frontend (localhost:5173)
✅ Custom User model
✅ REST Framework pagination
✅ MongoDB connection ready

### Next Steps to Complete:

1. **Create remaining views**:

   ```bash
   # Products views (CRUD)
   # Orders views (create, list, update status)
   # Admin dashboard stats
   ```

2. **Create URL patterns**:

   ```bash
   # API routes for all endpoints
   ```

3. **Run migrations**:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create superuser**:

   ```bash
   python manage.py createsuperuser
   ```

5. **Seed database** (optional):

   ```bash
   # Create seed script similar to Node version
   ```

6. **Run server**:
   ```bash
   python manage.py runserver 5000
   ```

### API Endpoints (To be completed):

#### Authentication

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

#### Admin Auth

- POST /api/admin/auth/login

#### Products

- GET /api/products
- GET /api/products/:id
- POST /api/admin/products
- PUT /api/admin/products/:id
- DELETE /api/admin/products/:id

#### Orders

- POST /api/orders
- GET /api/orders
- GET /api/orders/:id
- PUT /api/admin/orders/:id/status
- PUT /api/admin/orders/:id/notes
- GET /api/admin/dashboard/stats
- POST /api/admin/orders/export

### Environment Variables (.env):

```
MONGODB_URI=mongodb://localhost:27017/ecommerce
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### Status:

🟢 Models: Complete
🟢 Serializers: Complete  
🟡 Views: Partial (auth done, products/orders pending)
🟡 URLs: Pending
🟡 Migrations: Pending

**Ready for migration and view/URL completion!**
