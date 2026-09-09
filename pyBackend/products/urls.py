from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_products, name='get_products'),
    path('<int:pk>/', views.get_product_by_id, name='get_product_by_id'),
    path('<int:pk>', views.get_product_by_id, name='get_product_by_id_no_slash'),
]
