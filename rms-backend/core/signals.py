from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Bill, OrderItem

@receiver(post_save, sender=Bill)
def calculate_total_amount(sender, instance, created, **kwargs):
    if created:  # Only calculate on new Bill creation
        total_amount = sum(
            item.menu_item.amount * item.quantity
            for item in OrderItem.objects.filter(order=instance.order)
        )

        # Update the bill with the calculated amount
        instance.total_amount = total_amount
        instance.save()
