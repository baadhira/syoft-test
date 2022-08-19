
from django.contrib import admin
from django.urls import path,include
from app.views import *
from app import views 

from rest_framework.routers import DefaultRouter
ROUTER = DefaultRouter()
ROUTER.register("product", ProductView)
ROUTER.register("user", UserView)


urlpatterns = [
    path("", include(ROUTER.urls)),  

    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
]

# class UserRegistrationView(APIView):
#     renderer_classes = [UserRenderer]
#     def post(self,request,format=None):
#         serializer = UserRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             token = get_tokens_for_user(user)
#             print("user",user)
#             status = status.HTTP_201_CREATED
#             return Response({'token':token,'msg':'Registration successful'})
#         else:
#             print("serializer.errors")
#             return Response(serializer.errors)

