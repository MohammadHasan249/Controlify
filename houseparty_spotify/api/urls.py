from .views import RoomView
from django.urls import path

urlpatterns = [
    path('rooms', RoomView.as_view()),
]