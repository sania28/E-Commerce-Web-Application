from django.db import models
from django.conf import settings
from products.models import Product
import random
import string


class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    order_id = models.CharField(max_length=50, unique=True, blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    shipping_address = models.JSONField()  # Store full address as JSON
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'orders'
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.order_id:
            timestamp = str(int(self.created_at.timestamp() * 1000)) if self.created_at else str(int(__import__('time').time() * 1000))
            random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
            self.order_id = f"ORD-{timestamp}-{random_str}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.order_id


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=200)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'order_items'

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"


class AdminNote(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='admin_notes')
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'admin_notes'
        ordering = ['-created_at']

    def __str__(self):
        return f"Note for {self.order.order_id}"
