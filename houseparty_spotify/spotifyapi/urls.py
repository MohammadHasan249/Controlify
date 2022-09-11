from django.urls import path
from .views import AuthURLView, IsAuthenticatedView, spotify_callback

urlpatterns = [
    path('get-auth-url', AuthURLView.as_view()),
    path('is-authenticated', IsAuthenticatedView.as_view()),
    path('redirect', spotify_callback)
]