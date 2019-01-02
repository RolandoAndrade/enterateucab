from django.shortcuts import render, render_to_response
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import redirect


def index(request):
    """if not isinstance(request.user, AnonymousUser):
        # already logged
        return render_to_response('mappy_board/home.html')
    else:
        # home"""
    return render_to_response("../templates/html/index.html")