from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from LMS.utilization import send_mail_to_user
from cryptography.fernet import Fernet
from django.conf import settings
from .serializers import *

User = get_user_model()


fernet = Fernet(settings.ENCRYPTION_KEY)

class ResetPasswordEmailVierfication(APIView):
    def post(self, request):
        data =  request.data
        email = data['email'] if 'email' in data else ""
        
        if email:
            try:
                user = User.objects.get(username=email)
            except Exception as e:
                print("while reading user for email", e)
                return Response({'message':'user with this email id not present'},status=204)     
            if user:
                encMail = email
                body = {"link":f"{settings.HOST_URL}/reset-password?email={encMail}"}
                mail = send_mail_to_user("reset password", body, email)
                if mail:
                    return Response({"message":"mail sendt succfully"},status=200) 
                else:
                    return Response({"message":"failed to send mail"},status=400) 
        else:
            return Response({"message":"email field is mendatory"},status=200) 

class ResetPassword(APIView):
    def post(self, request):
        data =  request.data
        serializer = ResetSerializer(data=data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            new_password = serializer.validated_data['new_password']            
            # decEmail = fernet.decrypt(email).decode()
            decEmail = email
            user = User.objects.get(username=decEmail)
            user.set_password(new_password)
            user.save()
            return Response({"message":""},status=200) 
        else:
            return Response({"message":serializer.errors},status=400) 



