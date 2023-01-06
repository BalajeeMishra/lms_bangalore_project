from dataclasses import fields
from email.policy import default
from rest_framework import serializers
from core_app.serializers import GetTeacherSerializer, GetUserSerializer, CourseSerializerList
from products.models import *


class CoursePricingGet(serializers.ModelSerializer):
    class Meta:
        model = CoursePrice
        fields = '__all__'


class CourseDetailsCreate(serializers.ModelSerializer):
    class Meta:
        model = CourseDetails
        fields = '__all__'


class CourseDetailsGet(serializers.ModelSerializer):
    created_by = GetUserSerializer()
    updated_by = GetUserSerializer()
    # teacher=GetTeacherSerializer()
    course = CourseSerializerList()
    price = CoursePricingGet()

    class Meta:
        model = CourseDetails
        fields = '__all__'
