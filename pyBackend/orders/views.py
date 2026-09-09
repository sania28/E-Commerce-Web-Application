from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator
from django.db.models import Q, Sum, Count
from django.http import HttpResponse
from .models import Order, OrderItem, AdminNote
from products.models import Product
from .serializers import OrderSerializer, OrderCreateSerializer, AdminNoteSerializer
import csv
from decimal import Decimal


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    """Create new order (POST) or get user orders (GET)"""
    
    if request.method == 'GET':
        # Get user's orders
        try:
            orders = Order.objects.filter(user=request.user).prefetch_related('items', 'admin_notes')
            serializer = OrderSerializer(orders, many=True)
            return Response({'orders': serializer.data})
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # POST - Create new order
    try:
        serializer = OrderCreateSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        items_data = serializer.validated_data['items']
        shipping_address = serializer.validated_data['shipping_address']
        
        # Calculate total and validate stock
        total_amount = Decimal('0.00')
        order_items = []
        
        for item_data in items_data:
            try:
                product = Product.objects.get(pk=item_data['product'])
                
                if product.stock < item_data['quantity']:
                    return Response({
                        'message': f'{product.name} is out of stock. Available: {product.stock}'
                    }, status=status.HTTP_400_BAD_REQUEST)
                
                item_total = Decimal(str(product.price)) * item_data['quantity']
                total_amount += item_total
                
                order_items.append({
                    'product': product,
                    'product_name': product.name,
                    'quantity': item_data['quantity'],
                    'price': product.price
                })
                
            except Product.DoesNotExist:
                return Response({'message': f'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Create order
        order = Order.objects.create(
            user=request.user,
            total_amount=total_amount,
            shipping_address=shipping_address
        )
        
        # Create order items and update stock
        for item_data in order_items:
            OrderItem.objects.create(
                order=order,
                product=item_data['product'],
                product_name=item_data['product_name'],
                quantity=item_data['quantity'],
                price=item_data['price']
            )
            
            # Update stock
            product = item_data['product']
            product.stock -= item_data['quantity']
            product.save()
        
        serializer = OrderSerializer(order)
        return Response({'order': serializer.data}, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    """Get all orders for current user"""
    orders = Order.objects.filter(user=request.user).prefetch_related('items', 'admin_notes')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
    """Get single order by ID"""
    try:
        order = Order.objects.get(pk=pk, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)


# Admin endpoints
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_orders(request):
    """Admin: Get all orders with filters"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    orders = Order.objects.all().prefetch_related('items', 'admin_notes')
    
    # Search by order ID or customer email
    search = request.GET.get('search', '')
    if search:
        orders = orders.filter(
            Q(order_id__icontains=search) | Q(user__email__icontains=search)
        )
    
    # Filter by status
    order_status = request.GET.get('status', '')
    if order_status:
        orders = orders.filter(status=order_status)
    
    # Pagination
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 10))
    
    paginator = Paginator(orders, limit)
    page_obj = paginator.get_page(page)
    
    serializer = OrderSerializer(page_obj, many=True)
    
    return Response({
        'orders': serializer.data,
        'pagination': {
            'page': page,
            'limit': limit,
            'total': paginator.count,
            'pages': paginator.num_pages
        }
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_admin_order_by_id(request, pk):
    """Admin: Get single order"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        order = Order.objects.get(pk=pk)
        serializer = OrderSerializer(order)
        return Response({'order': serializer.data})
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_status(request, pk):
    """Admin: Update order status"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        order = Order.objects.get(pk=pk)
        new_status = request.data.get('status')
        
        if new_status not in dict(Order.STATUS_CHOICES):
            return Response({'message': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        
        order.status = new_status
        order.save()
        
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def add_admin_note(request, pk):
    """Admin: Add note to order"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        order = Order.objects.get(pk=pk)
        note_text = request.data.get('note')
        
        if not note_text:
            return Response({'message': 'Note is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        note = AdminNote.objects.create(order=order, note=note_text)
        serializer = AdminNoteSerializer(note)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_dashboard_stats(request):
    """Admin: Get dashboard statistics"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    total_orders = Order.objects.count()
    pending_orders = Order.objects.filter(status='Pending').count()
    total_revenue = Order.objects.aggregate(total=Sum('total_amount'))['total'] or 0
    total_products = Product.objects.filter(is_deleted=False).count()
    
    # Orders by status - format as array to match Express API
    orders_by_status = []
    for status_choice, _ in Order.STATUS_CHOICES:
        count = Order.objects.filter(status=status_choice).count()
        if count > 0:  # Only include statuses with orders
            orders_by_status.append({
                '_id': status_choice,
                'count': count
            })
    
    # Recent orders
    recent_orders = Order.objects.select_related('user').order_by('-created_at')[:5]
    recent_orders_data = []
    for order in recent_orders:
        recent_orders_data.append({
            '_id': str(order.id),
            'order_id': order.order_id,
            'user': {
                'name': order.user.name,
                'email': order.user.email
            },
            'totalAmount': float(order.total_amount),
            'status': order.status,
            'createdAt': order.created_at.isoformat()
        })
    
    return Response({
        'totalOrders': total_orders,
        'pendingOrders': pending_orders,
        'totalRevenue': float(total_revenue),
        'totalProducts': total_products,
        'ordersByStatus': orders_by_status,
        'recentOrders': recent_orders_data
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def export_orders_csv(request):
    """Admin: Export orders to CSV"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    order_ids = request.data.get('orderIds', [])
    
    if order_ids:
        orders = Order.objects.filter(pk__in=order_ids)
    else:
        orders = Order.objects.all()
    
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="orders.csv"'
    
    writer = csv.writer(response)
    writer.writerow(['Order ID', 'Customer Email', 'Total Amount', 'Status', 'Created At'])
    
    for order in orders:
        writer.writerow([
            order.order_id,
            order.user.email,
            order.total_amount,
            order.status,
            order.created_at.strftime('%Y-%m-%d %H:%M:%S')
        ])
    
    return response
