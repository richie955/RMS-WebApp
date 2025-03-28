from django.contrib import admin
from .models import MenuItem, Table, Order, Bill, TransactionHistory, InventoryItem



@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'available')
    search_fields = ('name', 'category')
    list_filter = ('category', 'available')

@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('id', 'number', 'capacity', 'reserved')
    search_fields = ('number',)
    list_filter = ('reserved',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'status', 'created_at')
    search_fields = ('status',)
    list_filter = ('status', 'created_at')
    filter_horizontal = ('menu_items', 'tables')  

@admin.register(Bill)
class BillAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'total_amount', 'generated_at')
    search_fields = ('order__id',)
    list_filter = ('generated_at',)

@admin.register(TransactionHistory)
class TransactionHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'bill', 'payment_method', 'transaction_time')
    search_fields = ('payment_method',)
    list_filter = ('transaction_time',)

@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'quantity', 'last_updated')
    search_fields = ('name',)
    list_filter = ('last_updated',)
