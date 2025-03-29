from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, role='waiter', shift='morning', **extra_fields):
        if not email:
            raise ValueError("The Email field is required")

        email = self.normalize_email(email)
        user = self.model(email=email, name=name, role=role, shift=shift, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, name, password, role='manager', **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    MANAGER = 'manager'
    WAITER = 'waiter'
    COOK = 'cook'

    ROLE_CHOICES = [
        (MANAGER, 'Manager'),
        (WAITER, 'Waiter'),
        (COOK, 'Cook'),
    ]

    MORNING = 'morning'
    EVENING = 'evening'
    NIGHT = 'night'

    SHIFT_CHOICES = [
        (MORNING, 'Morning'),
        (EVENING, 'Evening'),
        (NIGHT, 'Night'),
    ]

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    shift = models.CharField(max_length=20, choices=SHIFT_CHOICES)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return f"{self.name} ({self.role})"


class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('Starter', 'Starter'),
        ('Main Course', 'Main Course'),
        ('Dessert', 'Dessert'),
        ('Beverage', 'Beverage'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Main Course')  
    menuitem_image = models.ImageField(upload_to='menu_images/', blank=True, null=True)
        
    def __str__(self):
        return f"{self.name} ({self.category}) - ₹{self.price}"


# Table model
class Table(models.Model):
    number = models.IntegerField(unique=True)
    capacity = models.IntegerField()
    reserved = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Table {self.number}, Capacity:{self.capacity}"


class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='order_items')
    menu_item = models.ForeignKey(MenuItem, on_delete=models.PROTECT) 
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.menu_item.name} (x{self.quantity})"

class Order(models.Model):
    menu_items = models.ManyToManyField(MenuItem, through=OrderItem)  # Custom through model
    tables = models.ManyToManyField(Table)  # Default auto-created through table
    status = models.CharField(
        max_length=20,
        choices=[('Pending', 'Pending'), ('Completed', 'Completed')],
        default='Pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        # Delete all related OrderItem entries (Order-MenuItem link)
        self.orderitem_set.all().delete()

        # Clear the Order-Tables relationship (Many-to-Many link)
        self.tables.clear()

        # Proceed to delete the Order itself
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"Order #{self.id} - {self.status}"

    
# Bill model
class Bill(models.Model):
    is_paid=models.BooleanField(default=True)
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    generated_at = models.DateTimeField(auto_now_add=True)

# Transaction History model
class TransactionHistory(models.Model):
    bill = models.ForeignKey(Bill, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50)
    transaction_time = models.DateTimeField(auto_now_add=True)

# Inventory model
class InventoryItem(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)
