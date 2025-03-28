from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomUserViewSet, AdminViewSet, StaffViewSet, MenuItemViewSet,
    TableViewSet, OrderViewSet, BillViewSet, TransactionHistoryViewSet, InventoryItemViewSet
)

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'admins', AdminViewSet)
router.register(r'staffs', StaffViewSet)
router.register(r'menuitems', MenuItemViewSet)
router.register(r'tables', TableViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'bills', BillViewSet)
router.register(r'transactions', TransactionHistoryViewSet)
router.register(r'inventory', InventoryItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/menuitems/bulk_create/', MenuItemViewSet.as_view({'post': 'bulk_create'})),
]
