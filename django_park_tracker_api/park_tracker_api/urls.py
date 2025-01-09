from django.urls import path
from . import views

urlpatterns = [
    path('api/user', views.UserList.as_view(), name='user_list'), # api/Users will be routed to the UserList view for handling
    path('api/user/<int:pk>', views.UserDetail.as_view(), name='user_detail'), # api/Users will be routed to the ContactDetail view for handling
    path('api/trip', views.TripList.as_view(), name='trip_list'), # api/trips will be routed to the tripList view for handling
    path('api/trip/<int:pk>', views.TripDetail.as_view(), name='trip_detail'), # api/trips will be routed to the ContactDetail view for handling
]
