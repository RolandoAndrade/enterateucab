from rest_framework.serializers import ModelSerializer
from .models import User, Event


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'image', 'first_name', 'last_name', 'career', 'location',)


class CreateEventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ('author', 'date', 'title', 'description', 'cover', 'media', 'location')


class EventDataSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class AddUserToEventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ('attendance',)
