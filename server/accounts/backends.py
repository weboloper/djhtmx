from django.contrib.auth.backends import ModelBackend
from accounts.models import User
from django.db import models  # Import models from Django ORM
from django.conf import settings

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate__(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get('username')
        try:
            user = User.objects.get(models.Q(username__iexact=username) | models.Q(email__iexact=username))
        except User.DoesNotExist:
            return None
        else:
            # Check if the password is correct and the user can authenticate
            if user.check_password(password) and self.user_can_authenticate(user):
                
                # Check if email verification is required and if the user is verified
                if settings.EMAIL_VERIFICATION_REQUIRED_TO_LOGIN and not user.is_verified:
                    # If email verification is required and the user is not verified, block login
                    return None
                
                # If everything is fine, return the user object
                return user
        
        return None
        # else:
        #     if user.check_password(password) and self.user_can_authenticate(user):
        #         return user
        # return None
    
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Check if the user exists with either username or email
            user = User.objects.get(models.Q(username__iexact=username) | models.Q(email__iexact=username))
        except User.DoesNotExist:
            return None
        
        # Check the password
        if user.check_password(password):
            # Check if email verification is required and if the user is verified
            # if settings.EMAIL_VERIFICATION_REQUIRED_TO_LOGIN and not user.is_verified:
            #     # If email verification is required and the user is not verified, block login
            #     return user
            
            # If everything is fine, return the user object
            return user
        return None
