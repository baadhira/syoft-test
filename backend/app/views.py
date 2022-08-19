from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .models import *
from app.serializers import *
from django.contrib.auth import authenticate
from app.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from rest_framework_simplejwt.tokens import RefreshToken
from app.models import *
from rest_framework.viewsets import ModelViewSet


#to generate tokens manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }



class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_tokens_for_user(user)
            print("user",user)
            return Response({'token':token,'msg':'Registration successful'},status = status.HTTP_201_CREATED)
            
        else:
            print("serializer.errors")
            return Response(serializer.errors)



class UserLoginView(APIView):
   renderer_classes = [UserRenderer]
   def post(self, request,format=None): 
       serializer = UserLoginSerializer(data=request.data)
       if serializer.is_valid(raise_exception=True):
           username = serializer.data.get('username')
           password=serializer.data.get('password')
  
           user=authenticate(username=username,password=password)
           if user is not None :
               token = get_tokens_for_user(user)
               if user.role=="Admin":
                    return Response({'token':token,'msg':'Admin Login successful',"is_admin":"is_admin"},status=status.HTTP_200_OK)  
               elif user.role=='Manager':
                    return Response({'token':token,'msg':'Manager Login successful',"is_manager":"is_manager"},status=status.HTTP_200_OK) 
               else:
                    return Response({'token':token,'msg':'Staff Login successful',"is_staff":"is_staff"},status=status.HTTP_200_OK)  


           else:
               return Response({'errors':{'non_field errors':['username or password is not valid']}},status=status.HTTP_400_BAD_REQUEST)
       return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class ProductView(ModelViewSet):
    permission_classes =[IsAuthenticated]
    serializer_class =ProductSerializer
    queryset=Product.objects.all()

class UserView(ModelViewSet):
    permission_classes =[IsAuthenticated]
    serializer_class =UserSerializer
    queryset=User.objects.all()



