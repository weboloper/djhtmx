from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
import re

def validate_username(value):
    if not re.match(r'^[a-zA-Z0-9]+$', value):
        raise ValidationError(
            'Kullanıcı adı sadece alfanümerik karakterlerden oluşabilir',
            code='invalid_username'
        )
    
def unique_username(username):
    User = get_user_model()
    counter = 1
    while User.objects.filter(username=username):
        username = username + str(counter)
        counter += 1
        
    return username