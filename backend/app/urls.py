
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