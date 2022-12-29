from django.urls import path, include
from products.views import *
from purchase.views import CartOperations, DoCheckout, GetPaymentUrl, ValidatingTransaction

urlpatterns = [
    path('cart',CartOperations.as_view(),name ='Cart'),
    path('cart/<uuid:cart_id>',CartOperations.as_view(),name ='Cart delete'),
    # path('payment_url', GetPaymentUrl.as_view(), name='login'),
    path('checkout', DoCheckout.as_view(), name='checkout'),
    path('validate_transaction', ValidatingTransaction.as_view(), name='validate_transaction'),

]