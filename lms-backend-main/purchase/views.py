import json
import time
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from LMS.encode import decrypt_text, encrypt_text
from core_app.aws_interface import get_assessment_files, upload_assessment_file
from core_app.models import StudentCourse
from core_app.serializers import StudentCourseSerializer

from products.models import CourseDetails
from products.serializers import *
from purchase.ccavenue import cc_avenue_decrypt, cc_avenue_encrypt
from purchase.models import Cart, OrderItem, TransactionInfo
from purchase.serializers import CartCreate, CartGet, OrderItems, TransactionCreate
# Create your views here.
from django.conf import settings
import uuid
cc_avenue_redirect_url = settings.CC_AVENUE_REDIRECT_URL
cc_avenue_cancel_url = settings.CC_AVENUE_CANCEL_URL
cc_avenue_access_code = settings.CC_AVENUE_ACCESS_CODE


class CartOperations(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.data['user'] = request.user.id
        if Cart.objects.filter(user=request.user.id, product_id=request.data['product']).exists():
            return Response({"message": "Selected product already exist in cart"}, status=409)

        serializer = CartCreate(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Cart Updated", "data": serializer.data}, status=200)
        else:
            return Response({"message": "Invalid Data", "data": serializer.errors}, status=400)

    def get(self, request):
        cart = Cart.objects.filter(user=request.user.id)
        serializer = CartGet(cart, many=True)
        return Response({"message": "Success", "data": serializer.data}, status=200)

    def delete(self, request, cart_id=None):
        cart = Cart.objects.get(id=cart_id)
        serializer = CartGet(cart)
        cart.delete()
        return Response({"message": "Cart Deleted", "data": serializer.data}, status=200)


class GetPaymentUrl(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        plainText = ''
        for j in data:
            plainText += "%s=%s&" % (j, data[j])
        encrypted_data = cc_avenue_encrypt(plainText)
        payment_url = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=%s&access_code=%s' % (
            encrypted_data, settings.CC_AVENUE_ACCESS_CODE)
        return Response({"message": "no content", "payment_url": payment_url}, status=200)


class DoCheckout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.data['user'] = request.user.id
        transaction_id = uuid.uuid4()
        request.data['id'] = transaction_id
        transaction_info_serializer = TransactionCreate(data=request.data)
        if transaction_info_serializer.is_valid():
            data = request.data
            data['transaction_id'] = transaction_id
            cc_data = build_cc_avenue_params(data)
            plainText = ''
            for j in cc_data:
                plainText += "%s=%s&" % (j, cc_data[j])
            plainText += "cancel_url=%s&" % (cc_avenue_cancel_url+"?app_code="+encrypt_text(
                json.dumps({"transaction_id": str(transaction_id), "success": False})))
            plainText += "redirect_url=%s&" % (cc_avenue_redirect_url+"?app_code="+encrypt_text(
                json.dumps({"transaction_id": str(transaction_id), "success": True})))
            encrypted_data = cc_avenue_encrypt(plainText)

            payment_url = 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=%s&access_code=%s' % (
                encrypted_data, settings.CC_AVENUE_ACCESS_CODE)
            data['request'] = encrypted_data
            transaction_info_serializer = TransactionCreate(data=data)
            if transaction_info_serializer.is_valid():
                transaction_info_serializer.save()
                order_items = []
                for p in data['cart']:
                    order_items.append(
                        {"user": request.user.id, "order_id": transaction_id, "product_id": p['product']['course']['id']})
                order_items_serializer = OrderItems(
                    data=order_items, many=True)
                if order_items_serializer.is_valid():

                    order_items_serializer.save()
                    return Response({"message": "Success", "payment_url": payment_url}, status=200)
                else:
                    return Response({"message": "Invalid Data1", "error": order_items_serializer.errors}, status=400)
        else:
            return Response({"message": "Invalid Data2", "error": transaction_info_serializer.errors}, status=400)


class ValidatingTransaction(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.data['user'] = request.user.id
        decrypted_data = decrypt_text(request.data['app_code'])
        data = json.loads(decrypted_data)
        if data['success']:
            TransactionInfo.objects.filter(
                id=data['transaction_id']).update(status="Success")
            OrderItem.objects.filter(
                order_id=data['transaction_id']).update(status="Success")
            orders = OrderItem.objects.filter(
                order_id=data['transaction_id']).values()
            student_course = list()
            for order in orders:
                student_course.append(
                    {"course": order['product_id_id'], "student": order['user_id']})

            student_course = StudentCourseSerializer(
                data=student_course, many=True)
            if student_course.is_valid():
                student_course.save()
                Cart.objects.filter(user=request.user.id).delete()
            else:
                return Response({"message": "Failed while mapping to student", "success": False, "error": student_course.errors}, status=200)
            return Response({"message": "Payment Success", "success": True}, status=200)
        else:
            TransactionInfo.objects.filter(
                id=data['transaction_id']).update(status="Failed")
            OrderItem.objects.filter(
                order_id=data['transaction_id']).update(status="Failed")
            return Response({"message": "Payment Failed", "success": False}, status=200)


def build_cc_avenue_params(data):
    cc_data = {}
    cc_data['currency'] = 'INR'
    cc_data['amount'] = int(data['final_amount'])
    cc_data['billing_name'] = ("%s %s" % (
        data['first_name'], data['last_name']))
    cc_data['billing_address'] = (
        "%s , %s" % (data['street'], data['address']))
    cc_data['billing_city'] = ("%s" % (data['city']))
    cc_data['billing_state'] = ("%s" % (data['state']))
    cc_data['billing_zip'] = ("%s" % (data['zipcode']))
    cc_data['billing_country'] = ("%s" % (data['country']))
    cc_data['billing_tel'] = ("%s" % (data['phone_number']))
    cc_data['billing_email'] = ("%s" % (data['email']))
    cc_data['billing_notes'] = ("%s" % (data['note']))
    cc_data['order_id'] = data['transaction_id']
    return cc_data
