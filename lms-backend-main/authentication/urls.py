from django.urls import path
from .views import *

urlpatterns = [
    path('reset-password-email',ResetPasswordEmailVierfication.as_view(),name ='reset-password-email'),
    path('reset-password',ResetPassword.as_view(),name ='reset-password')
]