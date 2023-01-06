from email.headerregistry import Group
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from core_app.models import *
# admin.site.unregister(UserAdmin)
# admin.site.unregister(Group)


class UserAdmin(DjangoUserAdmin):
    list_display = ('id', 'first_name', 'last_name', 'username', 'email')
    pass


class TeacherAdminView(admin.ModelAdmin):
    list_display = ('id', 'user',
                    'qualification', 'phone_number', 'skills')


class StudentAdminView(admin.ModelAdmin):
    list_display = ('id', 'user', 'interested_categories')


class CourseCategoryAdminView(admin.ModelAdmin):
    list_display = ('id', 'title', 'description')


class CourseAdminView(admin.ModelAdmin):
    list_display = ('id', 'category', 'teacher', 'title', 'description')


admin.site.site_header = "LMS"
admin.site.site_title = "Admin Console"
admin.site.index_title = "LMS Admin Console"

# admin.site.unregister(User)
# admin.site.register(Teacher,  TeacherAdminView)
# admin.site.register(Student, StudentAdminView)
admin.site.register(CourseCategory, CourseCategoryAdminView)
# admin.site.register(Course, CourseAdminView)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
# admin.site.register(User)

# admin.site.register(CourseMaterial)
# admin.site.register(AssignmentMaterial)
# admin.site.register(StudentAssignmentSubmission)

# Register your models here.

# Register your models here.
# from .models import UserInformation

# class MyUserAdmin(UserAdmin):
#     model = UserInformation
#     list_display = ['username', 'degree','phone_number']
#     fieldsets = UserAdmin.fieldsets + (
#             (None, {'fields': ('degree', 'birth_date','phone_number')}),
#     ) #this will allow to change these fields in admin module


# admin.site.register(UserInformation, MyUserAdmin)
