from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Product
from .serializers import ProductSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def get_products(request):
    """Get all products with search, filter, and pagination"""
    products = Product.objects.filter(is_deleted=False)
    
    # Search
    search = request.GET.get('search', '')
    if search:
        products = products.filter(
            Q(name__icontains=search) | Q(description__icontains=search)
        )
    
    # Category filter
    category = request.GET.get('category', '')
    if category:
        products = products.filter(category=category)
    
    # Pagination
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 10))
    
    paginator = Paginator(products, limit)
    page_obj = paginator.get_page(page)
    
    serializer = ProductSerializer(page_obj, many=True)
    
    return Response({
        'products': serializer.data,
        'pagination': {
            'page': page,
            'limit': limit,
            'total': paginator.count,
            'pages': paginator.num_pages
        }
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_product_by_id(request, pk):
    """Get single product by ID"""
    try:
        product = Product.objects.get(pk=pk, is_deleted=False)
        serializer = ProductSerializer(product)
        return Response({'product': serializer.data})
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


# Admin endpoints
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def get_all_products_admin(request):
    """Admin: Get all products with pagination and filters, or create new product"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'POST':
        # Create new product
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # GET - List products with pagination and filters
    products = Product.objects.all()
    
    # Include deleted products option
    include_deleted = request.GET.get('includeDeleted', 'false')
    if include_deleted.lower() != 'true':
        products = products.filter(is_deleted=False)
    
    # Search
    search = request.GET.get('search', '')
    if search:
        products = products.filter(
            Q(name__icontains=search) | Q(description__icontains=search) | Q(slug__icontains=search)
        )
    
    # Category filter
    category = request.GET.get('category', '')
    if category and category != 'All':
        products = products.filter(category=category)
    
    # Pagination
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 10))
    
    paginator = Paginator(products.order_by('-created_at'), limit)
    page_obj = paginator.get_page(page)
    
    serializer = ProductSerializer(page_obj, many=True)
    
    return Response({
        'products': serializer.data,
        'pagination': {
            'page': page,
            'limit': limit,
            'total': paginator.count,
            'pages': paginator.num_pages
        }
    })


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def admin_product_detail(request, pk):
    """Admin: Get, update, or delete single product by ID"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response({'product': serializer.data})
    
    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    else:  # DELETE
        product.is_deleted = True
        product.save()
        serializer = ProductSerializer(product)
        return Response({
            'message': 'Product deleted successfully',
            'product': serializer.data
        })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product(request):
    """Admin: Create new product"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_product(request, pk):
    """Admin: Update product"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_product(request, pk):
    """Admin: Soft delete product"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        product = Product.objects.get(pk=pk)
        product.is_deleted = True
        product.save()
        return Response({'message': 'Product deleted successfully'})
    except Product.DoesNotExist:
        return Response({'message': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bulk_import_products(request):
    """Admin: Bulk import products"""
    if request.user.role != 'admin':
        return Response({'message': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
    
    products_data = request.data.get('products', [])
    
    if not products_data:
        return Response({'message': 'No products provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    created_products = []
    for product_data in products_data:
        serializer = ProductSerializer(data=product_data)
        if serializer.is_valid():
            created_products.append(serializer.save())
    
    return Response({
        'message': f'{len(created_products)} products imported successfully',
        'count': len(created_products)
    }, status=status.HTTP_201_CREATED)
