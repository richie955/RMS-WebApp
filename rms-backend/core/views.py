from rest_framework import viewsets
from .models import  MenuItem, Table, Order, Bill, TransactionHistory, InventoryItem
from .serializers import (MenuItemSerializer,
    TableSerializer, OrderSerializer, BillSerializer, TransactionHistorySerializer, InventoryItemSerializer
)
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import MenuItem
from .serializers import MenuItemSerializer
from django_filters.rest_framework import DjangoFilterBackend


from rest_framework import generics
from .models import User
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['order']  # Automatically allows filtering on all model fields

class TransactionHistoryViewSet(viewsets.ModelViewSet):
    queryset = TransactionHistory.objects.all()
    serializer_class = TransactionHistorySerializer

class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
    
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login
from .serializers import UserSignUpSerializer, UserSignInSerializer

# Sign-Up View
class SignUpView(APIView):
    def post(self, request):
        serializer = UserSignUpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Sign-In View
class SignInView(APIView):
    def post(self, request):
        serializer = UserSignInSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)  # Create session

            # Serialize and return full user details
            user_data = UserSerializer(user).data
            return Response({"message": "Login successful", "user": user_data}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
  
def get_order(request, order_id):
    # Retrieve the order or return a 404 if not found
    order = get_object_or_404(Order, id=order_id)

    # Serialize the order data
    order_data = {
        "id": order.id,
        "status": order.status,
        "created_at": order.created_at,
        "menu_items": [
            {
                "name": item.name,
                "quantity": item.quantity,
                "price": item.amount,
            }
            for item in order.menu_items.all()
        ],
        "tables": [table.id for table in order.tables.all()],
    }

    return JsonResponse(order_data, safe=False)


from rest_framework import viewsets
from .models import OrderItem
from .serializers import OrderItemSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
