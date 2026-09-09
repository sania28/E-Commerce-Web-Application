from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_order, name='create_order'),
    path('user/', views.get_user_orders, name='get_user_orders'),
    path('user', views.get_user_orders, name='get_user_orders_no_slash'),
    path('<int:pk>/', views.get_order_by_id, name='get_order_by_id'),
]
