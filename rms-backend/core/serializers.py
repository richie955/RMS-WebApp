from rest_framework import serializers
from .models import User, MenuItem, Table, Order, Bill, TransactionHistory, InventoryItem

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
        fields = ['id', 'username', 'name', 'email', 'role', 'shift']
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

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

class TransactionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionHistory
        fields = '__all__'

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'
