from django.http import JsonResponse
import psycopg2
from .serializers import OrderItemSerializer
from .models import OrderItem
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from .serializers import UserSignUpSerializer, UserSignInSerializer
from django.contrib.auth import login
from rest_framework.views import APIView
from .serializers import InventoryItemSerializer
from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework import viewsets
from .models import MenuItem, Table, Order, Bill, TransactionHistory, InventoryItem
from .serializers import (MenuItemSerializer,
                          TableSerializer, OrderSerializer, MenuItem, BillSerializer, TransactionHistorySerializer, InventoryItemSerializer
                          )
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import MenuItemSerializer
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime


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


from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from .db_utils import get_cursor  # Reuse the database utility

class TableViewSet(ViewSet):
    """
    ViewSet for handling restaurant tables using raw SQL queries.
    """

    def list(self, request):
        """List all tables."""
        try:
            with get_cursor() as cursor:
                cursor.execute("SELECT id, number, capacity, reserved FROM core_table;")
                rows = cursor.fetchall()
                tables = [
                    {
                        "id": row[0],
                        "number": row[1],
                        "capacity": row[2],
                        "reserved": row[3]
                    }
                    for row in rows
                ]
                return Response(tables, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        """Retrieve a single table by ID."""
        try:
            with get_cursor() as cursor:
                cursor.execute("SELECT id, number, capacity, reserved FROM core_table WHERE id = %s;", (pk,))
                row = cursor.fetchone()
                if row:
                    table = {
                        "id": row[0],
                        "number": row[1],
                        "capacity": row[2],
                        "reserved": row[3]
                    }
                    return Response(table, status=status.HTTP_200_OK)
                return Response({"error": "Table not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        """Create a new table."""
        try:
            data = request.data
            required_fields = ["number", "capacity", "reserved"]

            # Validate required fields
            for field in required_fields:
                if field not in data:
                    return Response(
                        {"error": f"Missing required field: {field}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            with get_cursor() as cursor:
                cursor.execute("""
                    INSERT INTO core_table (number, capacity, reserved)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                """, (
                    data["number"],
                    data["capacity"],
                    data["reserved"]
                ))
                new_id = cursor.fetchone()[0]
                return Response({"id": new_id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None):
        """Update an existing table."""
        try:
            data = request.data
            required_fields = ["number", "capacity", "reserved"]

            # Validate required fields
            for field in required_fields:
                if field not in data:
                    return Response(
                        {"error": f"Missing required field: {field}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            with get_cursor() as cursor:
                # Check if record exists
                cursor.execute("SELECT id FROM core_table WHERE id = %s;", (pk,))
                if not cursor.fetchone():
                    return Response({"error": "Table not found"}, status=status.HTTP_404_NOT_FOUND)

                cursor.execute("""
                    UPDATE core_table
                    SET number = %s, capacity = %s, reserved = %s
                    WHERE id = %s;
                """, (
                    data["number"],
                    data["capacity"],
                    data["reserved"],
                    pk
                ))
                return Response({"message": "Table updated successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    def partial_update(self, request, pk=None):
        """Partially update a table."""
        try:
            data = request.data
            fields_to_update = []
            values = []

            # Check which fields are provided in the request
            if "number" in data:
                fields_to_update.append("number = %s")
                values.append(data["number"])
            if "capacity" in data:
                fields_to_update.append("capacity = %s")
                values.append(data["capacity"])
            if "reserved" in data:
                fields_to_update.append("reserved = %s")
                values.append(data["reserved"])

            # If no valid fields are provided, return an error
            if not fields_to_update:
                return Response(
                    {"error": "No valid fields provided for update"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Add the primary key to the values list
            values.append(pk)

            # Construct the SQL query dynamically
            query = f"""
                UPDATE core_table
                SET {', '.join(fields_to_update)}
                WHERE id = %s;
            """

            with get_cursor() as cursor:
                # Check if record exists
                cursor.execute("SELECT id FROM core_table WHERE id = %s;", (pk,))
                if not cursor.fetchone():
                    return Response({"error": "Table not found"}, status=status.HTTP_404_NOT_FOUND)

                # Execute the update query
                cursor.execute(query, tuple(values))
                return Response({"message": "Table updated successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk=None):
        """Delete a table."""
        try:
            with get_cursor() as cursor:
                # Check if record exists
                cursor.execute("SELECT id FROM core_table WHERE id = %s;", (pk,))
                if not cursor.fetchone():
                    return Response({"error": "Table not found"}, status=status.HTTP_404_NOT_FOUND)

                cursor.execute("DELETE FROM core_table WHERE id = %s;", (pk,))
                return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    filter_backends = [DjangoFilterBackend]
    # Automatically allows filtering on all model fields
    filterset_fields = ['order']


class TransactionHistoryViewSet(viewsets.ModelViewSet):
    queryset = TransactionHistory.objects.all()
    serializer_class = TransactionHistorySerializer


class InventoryItemViewSet(ViewSet):
    """
    A ViewSet for managing inventory items using raw SQL queries.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.connection = psycopg2.connect(
            dbname="rms_db",
            user="rms_user",
            password="yourpassword",
            host="localhost",
            port="5432"
        )
        self.cursor = self.connection.cursor()

    def list(self, request):
        """
        Retrieve all inventory items.
        """
        try:
            self.cursor.execute(
                "SELECT id, name, quantity, last_updated FROM core_inventoryitem;")
            rows = self.cursor.fetchall()
            items = [
                {
                    "id": row[0],
                    "name": row[1],
                    "quantity": row[2],
                    "last_updated": row[3].isoformat()
                }
                for row in rows
            ]
            return Response(items, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        """
        Retrieve a single inventory item by ID.
        """
        try:
            self.cursor.execute(
                "SELECT id, name, quantity, last_updated FROM core_inventoryitem WHERE id = %s;", (pk,))
            row = self.cursor.fetchone()
            if row:
                item = {
                    "id": row[0],
                    "name": row[1],
                    "quantity": row[2],
                    "last_updated": row[3].isoformat()
                }
                return Response(item, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        """
        Create a new inventory item.
        """
        serializer = InventoryItemSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                now = datetime.utcnow()
                self.cursor.execute(
                    """
                    INSERT INTO core_inventoryitem (name, quantity, last_updated)
                    VALUES (%s, %s, %s) RETURNING id;
                    """,
                    (data["name"], data["quantity"], now)
                )
                self.connection.commit()
                item_id = self.cursor.fetchone()[0]
                return Response({"id": item_id}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """
        Update an existing inventory item.
        """
        serializer = InventoryItemSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                now = datetime.utcnow()
                self.cursor.execute(
                    """
                    UPDATE core_inventoryitem
                    SET name = %s, quantity = %s, last_updated = %s
                    WHERE id = %s;
                    """,
                    (data["name"], data["quantity"], now, pk)
                )
                self.connection.commit()
                return Response({"message": "Item updated successfully"}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """
        Delete an inventory item by ID.
        """
        try:
            self.cursor.execute(
                "DELETE FROM core_inventoryitem WHERE id = %s;", (pk,))
            self.connection.commit()
            return Response({"message": "Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def __del__(self):
        # Close the database connection when the viewset is destroyed
        if hasattr(self, 'cursor') and self.cursor is not None:
            self.cursor.close()
        if hasattr(self, 'connection') and self.connection is not None:
            self.connection.close()


class SignUpView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.connection = psycopg2.connect(
            dbname="rms_db",
            user="rms_user",
            password="yourpassword",
            host="localhost",
            port="5432"
        )
        self.cursor = self.connection.cursor()

    def post(self, request):
        """
        Handle user registration with raw SQL.
        Required fields: email, password, name, role, shift
        """
        data = request.data
        required_fields = ["email", "password", "name", "role", "shift"]
        missing_fields = [
            field for field in required_fields if field not in data]

        # Validate required fields
        if missing_fields:
            return Response(
                {"error": f"Missing required fields: {', '.join(missing_fields)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Extract fields
        email = data["email"]
        password = data["password"]
        name = data["name"]
        role = data["role"]
        shift = data["shift"]

        # Field validation
        if len(password) < 8:
            return Response(
                {"error": "Password must be at least 8 characters"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(role) > 20 or len(shift) > 20:
            return Response(
                {"error": "Role/Shift must be under 20 characters"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if "@" not in email:
            return Response(
                {"error": "Invalid email format"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Hash password
            hashed_pw = make_password(password)

            # Insert user with raw SQL
            self.cursor.execute(
                """
                INSERT INTO core_user (
                    password, email, name, role, shift,
                    is_superuser, is_staff, is_active
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
                """,
                (
                    hashed_pw, email, name, role, shift,
                    False,  # is_superuser
                    False,  # is_staff
                    True    # is_active
                )
            )
            self.connection.commit()
            user_id = self.cursor.fetchone()[0]

            return Response(
                {"id": user_id, "message": "User created successfully"},
                status=status.HTTP_201_CREATED
            )

        except psycopg2.IntegrityError as e:
            self.connection.rollback()
            return Response(
                {"error": "Email already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def __del__(self):
        # Clean up connections
        if hasattr(self, 'cursor'):
            self.cursor.close()
        if hasattr(self, 'connection'):
            self.connection.close()


class SignInView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.connection = psycopg2.connect(
            dbname="rms_db",
            user="rms_user",
            password="yourpassword",
            host="localhost",
            port="5432"
        )
        self.cursor = self.connection.cursor()

    def post(self, request):
        """
        Handle user sign-in using raw SQL.
        Required fields: email, password
        """
        data = request.data
        email = data.get("email")
        password = data.get("password")

        # Validate input fields
        if not email or not password:
            return Response(
                {"error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Fetch user details with role and shift
            self.cursor.execute(
                "SELECT id, password, is_active, role, shift, name  FROM core_user WHERE email = %s;",
                (email,)
            )
            user = self.cursor.fetchone()

            if user:
                # Unpack all fields in correct order
                # Order matches SQL SELECT
                user_id, hashed_password, is_active, role, shift, name = user

                # Check account activity
                if not is_active:
                    return Response(
                        {"error": "Account is inactive"},
                        status=status.HTTP_403_FORBIDDEN
                    )

                # Verify password
                if check_password(password, hashed_password):
                    user_object = self._get_django_user_object(user_id)
                    login(request, user_object)

                    # Include role and shift in response
                    user_data = {
                        "id": user_id,
                        "email": email,
                        "is_active": is_active,
                        "role": role,
                        "shift": shift,
                        "name": name,
                    }
                    return Response(
                        {"message": "Login successful", "user": user_data},
                        status=status.HTTP_200_OK
                    )

                else:
                    return Response(
                        {"error": "Invalid credentials"},
                        status=status.HTTP_401_UNAUTHORIZED
                    )
            else:
                return Response(
                    {"error": "User not found"},
                    status=status.HTTP_404_NOT_FOUND
                )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def _get_django_user_object(self, user_id):
        """
        Helper method to fetch a Django User object by ID.
        Required for Django's `login` function.
        """
        from django.contrib.auth import get_user_model
        User = get_user_model()
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def __del__(self):
        # Clean up database connections
        if hasattr(self, 'cursor'):
            self.cursor.close()
        if hasattr(self, 'connection'):
            self.connection.close()


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

from .db_utils import get_cursor

class OrderItemViewSet(ViewSet):
    """
    ViewSet for handling OrderItems using raw SQL queries.
    """
    
    def list(self, request):
        """List all order items with menu item information."""
        try:
            with get_cursor() as cursor:
                cursor.execute("""
                    SELECT oi.id, oi.quantity, oi.menu_item_id, oi.order_id, 
                           mi.name AS menu_item_name, mi.price
                    FROM core_orderitem oi
                    JOIN core_menuitem mi ON oi.menu_item_id = mi.id
                """)
                rows = cursor.fetchall()
                
                items = [
                    {
                        "id": row[0],
                        "quantity": row[1],
                        "menu_item": row[2],
                        "order_id": row[3],
                        "menu_item_name": row[4],
                        "price": row[5]
                    }
                    for row in rows
                ]
                return Response(items, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def retrieve(self, request, pk=None):
        """Retrieve a single order item."""
        try:
            with get_cursor() as cursor:
                cursor.execute("""
                    SELECT oi.id, oi.quantity, oi.menu_item_id, oi.order_id, 
                           mi.name AS menu_item_name, mi.price
                    FROM core_orderitem oi
                    JOIN core_menuitem mi ON oi.menu_item_id = mi.id
                    WHERE oi.id = %s
                """, (pk,))
                row = cursor.fetchone()
                
                if row:
                    item = {
                        "id": row[0],
                        "quantity": row[1],
                        "menu_item": row[2],
                        "order_id": row[3],
                        "menu_item_name": row[4],
                        "price": row[5]
                    }
                    return Response(item, status=status.HTTP_200_OK)
                return Response({"error": "Order item not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def create(self, request):
        """Create a new order item."""
        try:
            data = request.data
            required_fields = ["menu_item_id", "order_id", "quantity"]
            
            # Validate required fields
            for field in required_fields:
                if field not in data:
                    return Response(
                        {"error": f"Missing required field: {field}"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            with get_cursor() as cursor:
                cursor.execute("""
                    INSERT INTO core_orderitem (quantity, menu_item_id, order_id)
                    VALUES (%s, %s, %s)
                    RETURNING id;
                """, (
                    data["quantity"],
                    data["menu_item_id"],
                    data["order_id"]
                ))
                
                new_id = cursor.fetchone()[0]
                return Response({"id": new_id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def update(self, request, pk=None):
        """Update an existing order item."""
        try:
            data = request.data
            required_fields = ["menu_item_id", "order_id", "quantity"]
            
            # Validate required fields
            for field in required_fields:
                if field not in data:
                    return Response(
                        {"error": f"Missing required field: {field}"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            with get_cursor() as cursor:
                # Check if record exists
                cursor.execute("SELECT id FROM core_orderitem WHERE id = %s", (pk,))
                if not cursor.fetchone():
                    return Response({"error": "Order item not found"}, status=status.HTTP_404_NOT_FOUND)
                
                cursor.execute("""
                    UPDATE core_orderitem
                    SET quantity = %s, menu_item_id = %s, order_id = %s
                    WHERE id = %s;
                """, (
                    data["quantity"],
                    data["menu_item_id"],
                    data["order_id"],
                    pk
                ))
                
                return Response({"message": "Order item updated successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def destroy(self, request, pk=None):
        """Delete an order item."""
        try:
            with get_cursor() as cursor:
                # Check if record exists
                cursor.execute("SELECT id FROM core_orderitem WHERE id = %s", (pk,))
                if not cursor.fetchone():
                    return Response({"error": "Order item not found"}, status=status.HTTP_404_NOT_FOUND)
                
                cursor.execute("DELETE FROM core_orderitem WHERE id = %s", (pk,))
                return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)