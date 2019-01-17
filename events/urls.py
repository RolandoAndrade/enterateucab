from django.urls import path, include
from .views import ViewUser, CreateEvent, ViewEventByID, ViewAllEvents, AddUserToEvent, DeleteEvent, UpdateUserData, UpdateUserImage, ViewNewsByID, ViewAllNews, DeleteNews

urlpatterns = [
    path('users/', include('rest_auth.urls')),
    path('users/signup', include('rest_auth.registration.urls')),
    path('users/get/<pk>', ViewUser.as_view()),
    path('users/update/<pk>', UpdateUserData.as_view()),
    path('users/image/<pk>', UpdateUserImage.as_view()),
    path('events/create', CreateEvent.as_view()),
    path('events/get/<pk>', ViewEventByID.as_view()),
    path('events/getAll', ViewAllEvents.as_view()),
    path('events/attend/<pk>', AddUserToEvent.as_view()),
    path('events/delete/<pk>', DeleteEvent.as_view()),
    path('news/get/<pk>', ViewNewsByID.as_view()),
    path('news/getAll', ViewAllNews.as_view()),
    path('news/delete/<pk>', DeleteNews.as_view()),
]
