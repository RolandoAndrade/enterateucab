from rest_framework.serializers import ModelSerializer, IntegerField
from .models import User, Event, EventNews


class EventDataSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class EventNewsDataSerializer(ModelSerializer):
    class Meta:
        model = EventNews
        fields = '__all__'


class UserSerializer(ModelSerializer):
    attendance = EventDataSerializer(many=True, read_only=False)

    class Meta:
        model = User
        fields = ('email', 'image', 'first_name', 'last_name', 'career', 'location', 'attendance',)


class CreateEventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = ('author', 'date', 'title', 'description', 'cover', 'media', 'location', 'place')


class CreateNewsSerializer(ModelSerializer):
    class Meta:
        model = EventNews
        fields = ('writer', 'date', 'title', 'description', 'cover', 'location')


class AddUserToEventSerializer(ModelSerializer):
    attendance = IntegerField()

    class Meta:
        model = Event
        fields = ('attendance',)


class UpdateUser(ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'career', 'location',)


class UpdateProfileImage(ModelSerializer):

    class Meta:
        model = User
        fields = ('image',)