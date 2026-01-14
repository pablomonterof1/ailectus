
from django.contrib import admin
from django.urls import path
from main import views as main_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', main_views.home, name='home'),
    path("contacto/", main_views.contacto_view, name="contacto"),
    path("ova/", main_views.ova_view, name="ova"),
    path("genially/", main_views.genially_view, name="genially"),
    path("presentaciones/<slug:slug>/", main_views.genially_detail_view, name="genially_detail"),
    path("recursos/", main_views.recursos_view, name="recursos"),
]
