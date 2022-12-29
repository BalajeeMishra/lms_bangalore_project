from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'coupon', views.CouponViewSet, basename='coupon')
router.register(r'redeemed', views.ClaimedCouponViewSet, basename='redeemed')

urlpatterns = [
    path('', include(router.urls)),
]
