from django.urls import path, include

urlpatterns = [
    path('users/', include('rest_auth.urls')),
    path('users/signup', include('rest_auth.registration.urls')),
]



