from dataclasses import field
from rest_framework import serializers
from app.models import User,Product
from django.core.exceptions import ValidationError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth import get_user_model

class UserRegistrationSerializer(serializers.ModelSerializer):
    repassword=serializers.CharField(max_length=255,style={"input_type":'password'},write_only=True)
    role=serializers.CharField(max_length=255,write_only=True,required=True)
    class Meta:
        model = User
        fields=['email','phone_number' ,'username', 'password','role','repassword']
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def validate(self,attrs):
        password =attrs.get('password')
        repassword =attrs.get('repassword')
        if password != repassword:
            raise serializers.ValidationError("passwords doesn't match")
        return attrs



    def create(self,validate_data):
        return User.objects.create_user(**validate_data)


class UserLoginSerializer(serializers.ModelSerializer):
    username=serializers.CharField(max_length=50)
    class Meta:
        model = User
        fields = ['username','password']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['id','username','role']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('id','user','productname','price','stock','category')