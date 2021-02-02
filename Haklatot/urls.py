"""Haklatot URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

router = routers.DefaultRouter()
from store.serializers import DiscountSerializerViewSet,ProductSerializerViewSet, DiscountProductLinkSerializerViewSet
router.register(r'discounts', DiscountSerializerViewSet)
router.register(r'DiscountProductLinkSerializerViewSet', DiscountProductLinkSerializerViewSet)
router.register(r'products', ProductSerializerViewSet)

#from store import views
from store.views import  home_view, contact_post, cart_form
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view, name="home"),
    path('contact-form', contact_post),
    path('cart', cart_form),
    path('api/', include(router.urls))
]

if settings.DEBUG:
    urlpatterns= urlpatterns + static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
    urlpatterns= urlpatterns + static(settings.STATIC_URL, document_root= settings.STATIC_ROOT)
    