from rest_framework import generics
from rest_framework.request import Request
from . import models
from . import serializers
from rest_framework.response import Response


# Create your views here.


class ViewUser(generics.RetrieveAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def get(self, request, *args, **kwargs):
        if kwargs.get('pk') == 'me':
            return Response(self.get_serializer(request.user).data)
        return Response("Error")


class ViewEventByID(generics.RetrieveAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventDataSerializer


class ViewAllEvents(generics.ListAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventDataSerializer


class CreateEvent(generics.CreateAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.CreateEventSerializer

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)


class AddUserToEvent(generics.UpdateAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.AddUserToEventSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.attendance.add(self.request.user)
        instance.save()
        return Response("Logrado")