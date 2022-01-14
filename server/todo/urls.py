from django.urls import path
from . import views

app_name = 'todo'

urlpatterns = [
    path('', views.todo, name='todo'),
    path('todos/',  views.TodoAPI.as_view(), name='TodoAPI'),
]
