from django.urls import path, include
from products.views import *

urlpatterns = [
    path('course_detail', AddCourseDetails.as_view(), name='CourseDetails CRUD'),
    path('course_details', GetCourseDetails.as_view(), name='CourseDetails CRUD'),
    path('student_course_details', GetStudentCourseDetails.as_view(),
         name='StudentCourseDetails CRUD'),
    path('course_detail/<uuid:category_id>', AddCourseDetails.as_view(),
         name='CourseDetails get by category id'),
    path('course_details/<int:category_id>', GetCourseDetails.as_view(),
         name='CourseDetails get by category id'),
    path('student_course_details/<int:category_id>', GetStudentCourseDetails.as_view(),
         name='CourseDetails get by category id'),
    path('course_detail_status_update/<int:category_id>',
         CourseDetailStatusUpdate.as_view(), name='CourseDetails get by category id'),
    path('assets', AssetsOperation.as_view(), name='Assets'),
]
