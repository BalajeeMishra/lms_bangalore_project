from django.db import models
from django.contrib.auth.models import User

import uuid
from django.db.models import JSONField
from core_app.models import Course, CourseCategory, Teacher

# Create your models here.


class CoursePrice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="course_pricing_created_by")
    updated_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="course_pricing_updated_by")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = 'course_pricing'

    def __str__(self):
        return self.id


class CourseDetails(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(
        CourseCategory, on_delete=models.CASCADE, default="")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, default="")
    title = models.TextField(blank=True)
    # heading_1 = models.TextField(blank=True)
    batch = JSONField(blank=True, null=True)
    curriculum_link = models.TextField(blank=True)
    image_1 = models.TextField(blank=True)
    para_1 = models.TextField(blank=True)
    para_2 = models.TextField(blank=True)
    para_3 = models.TextField(blank=True)
    target_audience = models.TextField(blank=True)
    time_commitment = models.TextField(blank=True)
    module = models.JSONField(default=list, blank=True)
    # teacher = models.TextField(blank=True) Teacher
    # teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, default=None)
    video_thumb = models.TextField(blank=True)
    course_level = models.TextField(blank=True)
    duration = models.TextField(blank=True)
    lectures = models.TextField(blank=True)
    subject = models.TextField(blank=True)
    language = models.TextField(blank=True)
    twitter = models.TextField(blank=True)
    facebook = models.TextField(blank=True)
    instagram = models.TextField(blank=True)
    pinterst = models.TextField(blank=True)
    instructor_name = models.TextField(blank=True)
    instructor_designation = models.TextField(blank=True)
    instructor_image = models.TextField(blank=True)
    price = models.ForeignKey(
        CoursePrice, on_delete=models.CASCADE, default=None, related_name="course_details_pricing")
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, related_name="course_details_created_by")
    updated_by = models.ForeignKey(
        User, on_delete=models.CASCADE, default=None, related_name="course_details_updated_by")
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    class Meta:
        db_table = 'course_details'

    def __str__(self):
        return self.id
