from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=32)
    location = models.CharField(max_length=32)
    travel_preferences = models.CharField(max_length=200)

class Trip(models.Model):
    user_id = models.IntegerField()
    park_name = models.CharField(max_length=100)
    date_visited = models.DateField()
    star_rating = models.IntegerField()

