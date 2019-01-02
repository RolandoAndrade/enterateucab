try:
    from allauth.account import app_settings as allauth_settings
    from allauth.utils import email_address_exists
    from allauth.account.adapter import get_adapter
    from allauth.account.utils import setup_user_email
except ImportError:
    raise ImportError("allauth needs to be added to INSTALLED_APPS.")

from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers


class RegisterSerializer(RegisterSerializer):
    password2 = None
    username = None
    first_name = serializers.CharField(required = False, write_only = True, allow_blank = True)
    last_name = serializers.CharField(required = False, write_only = True, allow_blank = True)
    career = serializers.CharField(required = False, write_only = True, allow_blank = True)
    location = serializers.IntegerField(required = False, write_only = True)
    image = serializers.CharField(required = False, write_only = True, allow_blank = True)

    def validate(self, data):
        return data

    def get_cleaned_data(self):
        return {
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),

        }

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.career = self.validated_data.get('career', '')
        user.location = self.validated_data.get('location', '')
        user.image = self.validated_data.get('image', '')
        user.save(update_fields = ['first_name', 'last_name', 'career', 'location', 'image'])

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user
