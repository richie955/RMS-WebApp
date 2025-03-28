from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ( MenuItemViewSet,
    TableViewSet, OrderViewSet, BillViewSet, UserViewSet, TransactionHistoryViewSet, InventoryItemViewSet
)
from .views import SignUpView, SignInView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'menuitems', MenuItemViewSet)
router.register(r'tables', TableViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'bills', BillViewSet)
router.register(r'transactions', TransactionHistoryViewSet)
router.register(r'inventory', InventoryItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('api/menuitems/bulk_create/', MenuItemViewSet.as_view({'post': 'bulk_create'})),
]
