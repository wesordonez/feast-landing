from django.urls import path

from .views import contact_view, contact_api_view, contact_success


urlpatterns = [
    path('', contact_view, name='contact-us'),
    path('success/', contact_success, name='contact-success'),
    path('api/', contact_api_view, name='contact_api_view')
]
