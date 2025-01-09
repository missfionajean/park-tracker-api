from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, TripSerializer
from .models import User, Trip

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by('id') # tell django how to retrieve all objects from the DB, order by id ascending
    serializer_class = UserSerializer # tell django what serializer to use

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer

class TripList(generics.ListCreateAPIView):
    queryset = Trip.objects.all().order_by('id') # tell django how to retrieve all objects from the DB, order by id ascending
    serializer_class = TripSerializer # tell django what serializer to use

class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all().order_by('id')
    serializer_class = TripSerializer
