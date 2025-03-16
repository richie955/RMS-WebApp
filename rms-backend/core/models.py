from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Staff', 'Staff'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    # Avoid conflicts with Django's built-in User model
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="customuser_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="customuser_permissions",
        blank=True
    )


# Admin model (Manager)
class Admin(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'Admin'})
    name = models.CharField(max_length=100)

# Staff model (Chef, Waiter only)
class Staff(models.Model):
    TYPE_CHOICES = [
        ('Chef', 'Chef'),
        ('Waiter', 'Waiter'),
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'Staff'})
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    shift = models.CharField(max_length=50)
    name = models.CharField(max_length=100)

# Menu Item model
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
        
    def __str__(self):
        return f"{self.name} ({self.category}) - ₹{self.price}"


# Table model
class Table(models.Model):
    number = models.IntegerField(unique=True)
    capacity = models.IntegerField()
    reserved = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Table {self.number}, Capacity:{self.capacity}"

# Order model
class Order(models.Model):
    menu_items = models.ManyToManyField(MenuItem)
    tables = models.ManyToManyField(Table)
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Completed', 'Completed')], default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

# Bill model
class Bill(models.Model):
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
