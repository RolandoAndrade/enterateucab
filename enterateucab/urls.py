"""enterateucab URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.conf.urls.static import static
from django.conf import settings
from .views import index, login, signup, viewEvents, createEvents, viewCalendar, viewNews, openNews

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('events.urls')),
    path('', index, name="index"),
    path('login/', login, name="login"),
    path('signup/', signup, name="signup"),
    path('events/<pk>', viewEvents, name = "viewEvents"),
    path('events/edit/<pk>', viewEvents, name="editEvents"),
    path('create/', createEvents, name = "createEvents"),
    path('calendar/', viewCalendar, name="viewCalendar"),
    path('news/', viewNews, name="viewNews"),
    path('news/<pk>', openNews, name="openNews"),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)