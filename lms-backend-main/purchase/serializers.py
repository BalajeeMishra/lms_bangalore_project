from dataclasses import fields
from rest_framework import serializers
from core_app.serializers import GetTeacherSerializer, GetUserSerializer
from products.models import *
from products.serializers import CourseDetailsGet
from purchase.models import Cart, OrderItem, TransactionInfo


class CartGet(serializers.ModelSerializer):
    product = CourseDetailsGet()
    user = GetUserSerializer()

    class Meta:
        model = Cart
        fields = '__all__'


class CartCreate(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class TransactionCreate(serializers.ModelSerializer):
    class Meta:
        model = TransactionInfo
        fields = '__all__'


class OrderItems(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
