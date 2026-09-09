from django.contrib import admin
from .models import Order, OrderItem, AdminNote


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_name', 'quantity', 'price')


class AdminNoteInline(admin.TabularInline):
    model = AdminNote
    extra = 1


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'user', 'status', 'total_amount', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_id', 'user__email')
    inlines = [OrderItemInline, AdminNoteInline]
    readonly_fields = ('order_id', 'created_at', 'updated_at')
    ordering = ('-created_at',)
