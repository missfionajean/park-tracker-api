from django.contrib.auth.models import AbstractUser
import bcrypt
from django.db import models

class Usermodel(AbstractUser):
    username = models.CharField(max_length=32, unique = True)
    password = models.CharField(max_length= 200, default= '' )
    location = models.CharField(max_length=32)
    travel_preferences = models.CharField(max_length=200)
   
    def set_password(self, raw_password): #define the function to hash the password
        password_bytes = raw_password.encode('utf-8') #convert it into a byte string(required by bcrypt)
        salt = bcrypt.gensalt()
        hashedPassWord = bcrypt.hashpw(password_bytes, salt)
        self.password = hashedPassWord.decode('utf-8') #convert it back into a regular string for storage in database
        self.save() #save it in the database

    def check_password(self, raw_password):
        password_bytes = raw_password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, self.password.encode('utf-8'))

    def __str__(self): #display an object in lists for more readability
        return self.username
 

class Trip(models.Model):
    user_id = models.IntegerField()
    park_name = models.CharField(max_length=100)
    date_visited = models.DateField()
    star_rating = models.IntegerField()

