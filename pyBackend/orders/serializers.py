from rest_framework import serializers
from .models import Order, OrderItem, AdminNote
from products.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    _id = serializers.IntegerField(source='id', read_only=True)
    product = ProductSerializer(read_only=True)
    productName = serializers.CharField(source='product_name', read_only=True)
    name = serializers.CharField(source='product_name', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', '_id', 'product', 'product_name', 'productName', 'name', 'image', 'quantity', 'price']
    
    def get_image(self, obj):
        """Get product image, fallback to placeholder"""
        if obj.product and obj.product.images:
            return obj.product.images[0] if isinstance(obj.product.images, list) and len(obj.product.images) > 0 else None
        return None
    
    def to_representation(self, instance):
        """Convert price to float for JavaScript compatibility"""
        representation = super().to_representation(instance)
        representation['price'] = float(representation['price'])
        return representation


class AdminNoteSerializer(serializers.ModelSerializer):
    _id = serializers.IntegerField(source='id', read_only=True)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    
    class Meta:
        model = AdminNote
        fields = ['id', '_id', 'note', 'created_at', 'createdAt']
        read_only_fields = ['created_at', 'createdAt']


class OrderSerializer(serializers.ModelSerializer):
    _id = serializers.IntegerField(source='id', read_only=True)
    orderId = serializers.CharField(source='order_id', read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)
    adminNotes = AdminNoteSerializer(many=True, read_only=True, source='admin_notes')
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    totalAmount = serializers.FloatField(source='total_amount', read_only=True)
    shippingAddress = serializers.JSONField(source='shipping_address', read_only=True)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    updatedAt = serializers.DateTimeField(source='updated_at', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', '_id', 'order_id', 'orderId', 'user_email', 'user_name',
            'total_amount', 'totalAmount', 'status', 
            'shipping_address', 'shippingAddress', 
            'items', 'admin_notes', 'adminNotes', 
            'created_at', 'createdAt', 'updated_at', 'updatedAt'
        ]
        read_only_fields = ['id', '_id', 'order_id', 'orderId', 'created_at', 'createdAt', 'updated_at', 'updatedAt']


class OrderCreateSerializer(serializers.Serializer):
    items = serializers.ListField(child=serializers.DictField())
    shippingAddress = serializers.DictField(source='shipping_address')

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Items cannot be empty")
        return value

    def validate_shippingAddress(self, value):
        required_fields = ['fullName', 'address', 'city', 'zipCode', 'country', 'phone']
        for field in required_fields:
            if field not in value:
                raise serializers.ValidationError(f"{field} is required")
        # Optional: state field
        return value
