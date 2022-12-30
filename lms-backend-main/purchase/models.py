import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from core_app.models import Course, Student, User
from products.models import CourseDetails

from coupons.models import Coupon
# Create your models here.


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(CourseDetails, on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="cart_added_by")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'cart'

    def __str__(self):
        return self.id


class TransactionInfo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="transaction_transacted_by")

    first_name = models.TextField()
    last_name = models.TextField()
    phone_number = models.TextField()
    email = models.TextField()
    company_name = models.TextField(blank=True)
    company_address = models.TextField(blank=True)
    country = models.TextField()
    state = models.TextField()
    city = models.TextField()
    zipcode = models.TextField()
    street = models.TextField()
    address = models.TextField()
    note = models.TextField(blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    coupon = models.TextField(blank=True, null=True,)
    discount = models.IntegerField(blank=True, null=True, validators=[
                                   MinValueValidator(0), MaxValueValidator(100)])
    final_amount = models.DecimalField(max_digits=10, decimal_places=2)

    status = models.TextField(blank=True, default='Pending')

    request = models.TextField(blank=True)
    response = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'transaction'

    def __str__(self):
        return self.id


class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="order_item_transacted_by")
    order_id = models.ForeignKey(
        TransactionInfo, on_delete=models.CASCADE, related_name="transaction_order_id")
    product_id = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="transaction_product_id")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.TextField(blank=True, default='Pending')

    class Meta:
        db_table = 'order_items'

    def __str__(self):
        return self.id
