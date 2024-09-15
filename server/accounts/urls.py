from django.urls import path
from accounts.views import *
from django.views.generic import TemplateView

from django.urls import path, include
from . import views

app_name = 'accounts'

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', logout_view, name='logout'),
    path('email-verification-confirm/<uidb64>/<token>/', views.verification_view, name='email_verification'),

    path('password-reset/', password_reset_request, name='password_reset'),
    path('password-reset/<uidb64>/<token>/', password_reset_confirm, name='password_reset_confirm'),

    path('send-email/', send_email_view, name='send_email'),
    # Add a success URL or view for redirect after email is sent
    path('email-sent-success/', TemplateView.as_view(template_name='accounts/email_sent_success.html'), name='email_sent_success'),


    path('accounts/api/', include('accounts.api.urls')),
    path('auth-receiver', views.auth_receiver, name='auth_receiver'),


]