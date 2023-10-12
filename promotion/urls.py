from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('submit_form/', views.save_message, name='save_message'),
]