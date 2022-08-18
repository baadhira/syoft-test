from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser,AbstractUser
import datetime
from django.utils.timezone import now
from datetime import date
from django.conf import settings
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email,phone_number ,username,password=None,repassword=None,role=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            phone_number=phone_number,
            password=password,  
            role=role   
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,phone_number ,username,password=None):
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            phone_number=phone_number,
            password=password,  
        
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


Role=(
    ('Admin','Admin'),
    ('Manager','Manager'),
    ('Staff','Staff')
)

class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    phone_number = models.CharField(max_length=200)

    username = models.CharField(max_length=250, unique=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateField(blank=True, null=True,default=datetime.date.today)
    role=models.CharField(max_length=250)
    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','phone_number','role']
    def __str__(self):
        return self.username

class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    productname=models.CharField(max_length=250)
    price=models.FloatField()
    stock=models.IntegerField()
    category=models.CharField(max_length=250)
    created_date= models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.productname

   
    