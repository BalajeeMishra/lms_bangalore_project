from rest_framework import serializers

class ResetSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=1500)
    new_password = serializers.CharField(max_length=400)
