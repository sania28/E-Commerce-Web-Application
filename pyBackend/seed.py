import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_api.settings')
django.setup()

from users.models import User
from products.models import Product


def seed_database():
    print("🌱 Seeding database...")

    # Create admin user
    if not User.objects.filter(email='admin@example.com').exists():
        admin = User.objects.create_user(
            email='admin@example.com',
            name='Admin User',
            password='Admin@12345',
            role='admin',
            is_staff=True,
            is_superuser=True
        )
        print(f"✅ Created admin user: {admin.email}")
    else:
        print("⚠️  Admin user already exists")

    # Create test user
    if not User.objects.filter(email='user@example.com').exists():
        user = User.objects.create_user(
            email='user@example.com',
            name='Test User',
            password='User@12345',
            role='user'
        )
        print(f"✅ Created test user: {user.email}")
    else:
        print("⚠️  Test user already exists")

    # Create sample products
    products_data = [
        {
            'name': 'Wireless Headphones',
            'description': 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
            'price': 2999.00,
            'category': 'Electronics',
            'weight': 0.25,
            'stock': 50,
            'images': ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500']
        },
        {
            'name': 'Smart Watch',
            'description': 'Fitness tracking smartwatch with heart rate monitor and GPS.',
            'price': 4999.00,
            'category': 'Electronics',
            'weight': 0.05,
            'stock': 30,
            'images': ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500']
        },
        {
            'name': 'Laptop Backpack',
            'description': 'Durable water-resistant backpack with dedicated laptop compartment.',
            'price': 1499.00,
            'category': 'Accessories',
            'weight': 0.8,
            'stock': 75,
            'images': ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500']
        },
        {
            'name': 'USB-C Hub',
            'description': '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.',
            'price': 799.00,
            'category': 'Electronics',
            'weight': 0.1,
            'stock': 100,
            'images': ['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500']
        },
        {
            'name': 'Mechanical Keyboard',
            'description': 'RGB backlit mechanical keyboard with blue switches.',
            'price': 3499.00,
            'category': 'Electronics',
            'weight': 1.2,
            'stock': 40,
            'images': ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500']
        },
        {
            'name': 'Wireless Mouse',
            'description': 'Ergonomic wireless mouse with adjustable DPI and rechargeable battery.',
            'price': 899.00,
            'category': 'Electronics',
            'weight': 0.1,
            'stock': 80,
            'images': ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500']
        },
        {
            'name': 'Portable SSD',
            'description': '1TB portable SSD with USB-C connectivity and 550MB/s transfer speed.',
            'price': 5999.00,
            'category': 'Storage',
            'weight': 0.05,
            'stock': 60,
            'images': ['https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500']
        },
        {
            'name': 'Webcam HD',
            'description': '1080p webcam with autofocus and built-in microphone.',
            'price': 2499.00,
            'category': 'Electronics',
            'weight': 0.15,
            'stock': 45,
            'images': ['https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500']
        },
        {
            'name': 'Phone Stand',
            'description': 'Adjustable aluminum phone stand compatible with all smartphones.',
            'price': 499.00,
            'category': 'Accessories',
            'weight': 0.2,
            'stock': 120,
            'images': ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500']
        },
        {
            'name': 'Cable Organizer',
            'description': 'Cable management box with multiple slots for organized desk setup.',
            'price': 299.00,
            'category': 'Accessories',
            'weight': 0.3,
            'stock': 150,
            'images': ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500']
        },
        {
            'name': 'LED Desk Lamp',
            'description': 'Adjustable LED desk lamp with touch control and USB charging port.',
            'price': 1299.00,
            'category': 'Accessories',
            'weight': 0.5,
            'stock': 65,
            'images': ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500']
        },
        {
            'name': 'Bluetooth Speaker',
            'description': 'Portable Bluetooth speaker with 360° sound and 12-hour battery.',
            'price': 1999.00,
            'category': 'Electronics',
            'weight': 0.4,
            'stock': 55,
            'images': ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500']
        }
    ]

    created_count = 0
    for product_data in products_data:
        if not Product.objects.filter(name=product_data['name']).exists():
            Product.objects.create(**product_data)
            created_count += 1
            print(f"✅ Created product: {product_data['name']}")

    if created_count == 0:
        print("⚠️  All products already exist")
    else:
        print(f"\n🎉 Database seeded successfully! Created {created_count} products.")

    print("\n📝 Demo Credentials:")
    print("Admin: admin@example.com / Admin@12345")
    print("User: user@example.com / User@12345")


if __name__ == '__main__':
    seed_database()
