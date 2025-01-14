from rest_framework.permissions import AllowAny
from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer, TripSerializer
from .models import Usermodel, Trip

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = Usermodel.objects.all().order_by('id') # tell django how to retrieve all objects from the DB, order by id ascending
    serializer_class = UserSerializer # tell django what serializer to use
    authentication_classes = []
    permission_classes = [AllowAny]
   
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usermodel.objects.all().order_by('id')
    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

class TripList(generics.ListCreateAPIView):
    queryset = Trip.objects.all().order_by('id') # tell django how to retrieve all objects from the DB, order by id ascending
    serializer_class = TripSerializer # tell django what serializer to use

class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all().order_by('id')
    serializer_class = TripSerializer
