from rest_framework import serializers
from .models import User, MenuItem, Table, Order, Bill, TransactionHistory, InventoryItem
from .models import OrderItem
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

# User Sign-Up Serializer
class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'role', 'shift']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)  # Uses Django's create_user()
        return user

# User Sign-In Serializer
class UserSignInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return user



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role', 'shift']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Use create_user to hash the password
        user = User.objects.create_user(**validated_data)
        return user
    

        
        
class BulkMenuItemSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        return MenuItem.objects.bulk_create([MenuItem(**item) for item in validated_data])

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'
        list_serializer_class = BulkMenuItemSerializer  # Enable bulk insert

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'


from rest_framework import serializers
from .models import Order, OrderItem, Table, MenuItem

from rest_framework import serializers
from .models import Order, OrderItem, MenuItem, Table

class OrderItemSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.CharField(source='menu_item.name', read_only=True)
    menu_item = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())
    price = serializers.CharField(source='menu_item.price', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'menu_item', 'quantity', 'menu_item_name','price']

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    tables = serializers.PrimaryKeyRelatedField(queryset=Table.objects.all(), many=True)

    class Meta:
        model = Order
        fields = ['id', 'tables', 'status', 'order_items', 'created_at']

    def create(self, validated_data):
        # Extract order items and tables
        order_items_data = validated_data.pop('order_items')
        tables_data = validated_data.pop('tables')

        # Create the order
        order = Order.objects.create(**validated_data)

        # Associate tables
        order.tables.set(tables_data)

        # Create OrderItems with correct menu_item handling
        for item_data in order_items_data:
            menu_item = item_data.pop('menu_item')
            OrderItem.objects.create(order=order, menu_item=menu_item, **item_data)

        return order

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = ["id", "order", "total_amount", "is_paid"]
        
    
class TransactionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionHistory
        fields = '__all__'

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'
