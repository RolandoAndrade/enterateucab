from django.shortcuts import render, render_to_response
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import redirect


def index(request):
    if not isinstance(request.user, AnonymousUser):
        # already logged
        return render_to_response("../templates/html/home-logged.html")
    else:
        # home
        return render_to_response("../templates/html/home.html")


def login(request):
    if not isinstance(request.user, AnonymousUser):
        # already logged
        return redirect('../')
    else:
        # home
        return render_to_response("../templates/html/login-form.html")


def signup(request):
    if not isinstance(request.user, AnonymousUser):
        # already logged
        return redirect('../')
    else:
        # home
        return render_to_response("../templates/html/signup-form.html")


def viewEvents(request, pk):
    if not isinstance(request.user, AnonymousUser):
        # already logged
        return render_to_response("../templates/html/event-info-log.html")
    else:
        # home"""
        return render_to_response("../templates/html/event-info.html")


def createEvents(request):
    if not isinstance(request.user, AnonymousUser):
        return render_to_response("../templates/html/create-form.html")
    else:
        return redirect('../login')
