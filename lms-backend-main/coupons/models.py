from django.db import models
from django.utils.timezone import now, make_aware
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from datetime import datetime

try:
    # In case they specified something else in their settings file, which is quite common.
    user = settings.AUTH_USER_MODEL
except AttributeError:
    # get_user_model isn't working at this point in loading.
    from django.contrib.auth.models import User as user


class Coupon(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    code = models.CharField(max_length=64, unique=True)
    code_l = models.CharField(max_length=64, blank=True, unique=True)

    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()

    discount = models.IntegerField()

    repeat = models.IntegerField(default=0)
    active = models.BooleanField()

    def __str__(self) -> str:
        return self.code

    def save(self, *args, **kwargs) -> None:
        time = make_aware(datetime.now())
        if time > self.valid_to or time < self.valid_from:
            self.active = False
        elif self.valid_from <= time < self.valid_to:
            self.active = True
        return super().save(*args, **kwargs)


class ClaimedCoupon(models.Model):
    redeemed_at = models.DateTimeField(auto_now_add=True)
    coupon = models.ForeignKey('Coupon', on_delete=models.CASCADE)
    user = models.ForeignKey(user, on_delete=models.CASCADE)
