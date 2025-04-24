from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password, first_name, last_name):
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")

        user = self.model(
            username=username,
            email=self.normalize_email(email),
            password=password,  # No hashing, storing as plain text
            first_name=first_name,
            last_name=last_name
        )
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, first_name, last_name):
        user = self.create_user(username, email, password, first_name, last_name)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)  # No hashing
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30,null=True,blank=True,default=None)
    last_name = models.CharField(max_length=30,null=True,blank=True,default=None)

    last_login = None 


    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    class Meta:
        db_table = "users"
