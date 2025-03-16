from rest_framework import viewsets
from .models import CustomUser, Admin, Staff, MenuItem, Table, Order, Bill, TransactionHistory, InventoryItem
from .serializers import (
    CustomUserSerializer, AdminSerializer, StaffSerializer, MenuItemSerializer,
    TableSerializer, OrderSerializer, BillSerializer, TransactionHistorySerializer, InventoryItemSerializer
)
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import MenuItem
from .serializers import MenuItemSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class AdminViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    
    @action(detail=False, methods=['POST'])
    def bulk_create(self, request):
        serializer = MenuItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Menu items added successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

class TransactionHistoryViewSet(viewsets.ModelViewSet):
    queryset = TransactionHistory.objects.all()
    serializer_class = TransactionHistorySerializer

class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
