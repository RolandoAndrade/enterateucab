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
        return self.retrieve(request, *args, **kwargs)


class ViewEventByID(generics.RetrieveAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventDataSerializer


class ViewNewsByID(generics.RetrieveAPIView):
    queryset = models.EventNews.objects.all()
    serializer_class = serializers.EventNewsDataSerializer


class ViewAllEvents(generics.ListAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventDataSerializer


class ViewAllNews(generics.ListAPIView):
    queryset = models.EventNews.objects.all()
    serializer_class = serializers.EventNewsDataSerializer


class CreateEvent(generics.CreateAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.CreateEventSerializer

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)


class CreateEventNews(generics.CreateAPIView):
    queryset = models.EventNews.objects.all()
    serializer_class = serializers.CreateNewsSerializer

    def perform_create(self, serializer):
        serializer.save(writer = self.request.user)


class AddUserToEvent(generics.UpdateAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.AddUserToEventSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.attendance.add(self.request.user)
        instance.save()
        return Response("Logrado")


class DeleteEvent(generics.DestroyAPIView):
    queryset = models.Event.objects.all()
    serializer_class = serializers.EventDataSerializer


class DeleteNews(generics.DestroyAPIView):
    queryset = models.EventNews.objects.all()
    serializer_class = serializers.EventNewsDataSerializer


class UpdateUserData(generics.UpdateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UpdateUser


class UpdateUserImage(generics.UpdateAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UpdateProfileImage

    def put(self, request, *args, **kwargs):
        if kwargs.get('pk') == 'me':
            kwargs = {'pk': request.user.pk}
            self.kwargs = kwargs
            return self.update(request, *args, **kwargs)
        return self.update(request, *args, **kwargs)