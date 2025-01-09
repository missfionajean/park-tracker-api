from rest_framework import serializers 
from .models import User
from .models import Trip

class UserSerializer(serializers.ModelSerializer): # serializers.ModelSerializer just tells django to convert sql to JSON
    class Meta:
        model = User # tell django which model to use
        fields = ('id', 'username', 'location', 'travel_preferences',) # tell django which fields to include

class TripSerializer(serializers.ModelSerializer): # serializers.ModelSerializer just tells django to convert sql to JSON
    class Meta:
        model = Trip # tell django which model to use
        fields = ('id', 'park_name', 'times_visited', 'star_rating', 'user_id',) # tell django which fields to include