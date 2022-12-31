from django.conf import settings
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import user_passes_test

from .models import Coupon, ClaimedCoupon
from .serializers import CouponSerializer, ClaimedCouponSerializer


def get_redeemed_queryset(user, coupon_id=None):
    """
    Return a consistent list of the redeemed list.  across the two endpoints.
    """

    api_command = 'REDEEMED'

    # If the a coupon isn't specified, get them all.
    if coupon_id is None:
        qs_all = ClaimedCoupon.objects.all()
        qs_some = ClaimedCoupon.objects.filter(user=user.id)
    else:
        qs_all = ClaimedCoupon.objects.filter(coupon=coupon_id)
        qs_some = ClaimedCoupon.objects.filter(coupon=coupon_id, user=user.id)

    if user.is_superuser:
        return qs_all

    return qs_some


@api_view(['GET'])
def validate_coupon(request, coupon_code: str):
    coupon = get_object_or_404(
        Coupon.objects.all(), code_l=coupon_code.lower())
    ser = CouponSerializer(coupon)
    return Response(ser.data, status=status.HTTP_200_OK)


class CouponViewSet(viewsets.ModelViewSet):
    """
    API endpoint that lets you create, delete, retrieve coupons.
    """
    permission_classes = [IsAuthenticated]
    filter_backends = (filters.OrderingFilter, filters.SearchFilter,
                       DjangoFilterBackend)
    ordering = ('-updated')
    search_fields = ('code', 'code_l')
    serializer_class = CouponSerializer

    def get_queryset(self):
        """
        Return a subset of coupons or all coupons depending on who is asking.
        """

        qs_all = Coupon.objects.all()

        for object in qs_all:
            object.save()

        if self.request.user.is_staff:
            return qs_all

        return qs_all

    def create(self, request, **kwargs):
        """
        Create a coupon
        """

        serializer = CouponSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None, **kwargs):
        """
        Delete the coupon.
        """

        coupon = get_object_or_404(Coupon.objects.all(), pk=pk)
        coupon.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None, **kwargs):
        return Response(status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, pk=None, **kwargs):
        """
        Anybody can retrieve any coupon.
        """

        value_is_int = False

        try:
            pk = int(pk)
            value_is_int = True
        except ValueError:
            pass

        if value_is_int:
            coupon = get_object_or_404(Coupon.objects.all(), pk=pk)
        else:
            coupon = get_object_or_404(Coupon.objects.all(), code_l=pk.lower())

        serializer = CouponSerializer(coupon, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None, **kwargs):
        """
        This forces it to return a 202 upon success instead of 200.
        """

        coupon = get_object_or_404(Coupon.objects.all(), pk=pk)

        serializer = CouponSerializer(
            coupon, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def redeemed(self, request, pk=None, **kwargs):
        """
        Convenience endpoint for getting list of claimed instances for a coupon.
        """

        coupon = get_object_or_404(Coupon.objects.all(), pk=pk)
        qs = get_redeemed_queryset(self.request.user, coupon.id)

        serializer = ClaimedCouponSerializer(
            qs, many=True, context={'request': request})

        return Response(serializer.data)

    @action(detail=True, methods=['put'])
    def redeem(self, request, pk=None, **kwargs):
        """
        Convenience endpoint for redeeming.
        """

        queryset = Coupon.objects.all()
        coupon = get_object_or_404(queryset, pk=pk)

        data = {
            'coupon': pk,
            'user':   self.request.user.id,
            'discount': coupon.discount
        }

        serializer = ClaimedCouponSerializer(
            data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClaimedCouponViewSet(viewsets.ModelViewSet):
    """
    API endpoint that lets you retrieve claimed coupon details.
    """
    permission_classes = [IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('user',)
    serializer_class = ClaimedCouponSerializer

    def get_queryset(self):
        return get_redeemed_queryset(self.request.user)

    def create(self, request, **kwargs):
        return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None, **kwargs):
        """
        Basically un-redeem a coupon.
        """

        redeemed = get_object_or_404(ClaimedCoupon.objects.all(), pk=pk)
        redeemed.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, pk=None, **kwargs):
        return Response(status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, pk=None, **kwargs):
        return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None, **kwargs):
        return Response(status=status.HTTP_404_NOT_FOUND)
