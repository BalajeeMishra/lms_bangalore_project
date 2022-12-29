class RegisterSerializer(serializers.Serializer):    
    first_name = serializers.CharField(max_length=243)
    last_name = serializers.CharField(max_length=243)
    password = serializers.CharField(max_length=243)        
    is_staff = serializers.BooleanField()
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=243)
    degree = serializers.CharField(max_length=243)
    