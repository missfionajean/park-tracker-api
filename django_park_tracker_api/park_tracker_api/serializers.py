from rest_framework import serializers 
from .models import Usermodel
from .models import Trip

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usermodel
        fields = ['id', 'username', 'password', 'location', 'travel_preferences']
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password isn't exposed in responses

    def create(self, validated_data): #function to verify the input data bfore storage in database
        raw_password = validated_data.pop('password') # remove the password from the inputs field (we don't want to store it as it is)
        user = Usermodel(**validated_data) # create a new user excluding the password
        user.set_password(raw_password)  # Use bcrypt to hash the password and store it in the object
        return user 

   

class TripSerializer(serializers.ModelSerializer): # serializers.ModelSerializer just tells django to convert sql to JSON
    class Meta:
        model = Trip # tell django which model to use
        fields = ('id', 'park_name', 'date_visited', 'star_rating', 'user_id',) # tell django which fields to include
