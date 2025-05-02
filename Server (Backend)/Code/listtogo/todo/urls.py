from django.urls import path
from . import views

urlpatterns = [
    path('create-task/', views.create_task, name='create_task'),
    path('todo/api/<int:task_id>/edit/', views.edit_task, name='edit_task'),   
    path('todo/api/<int:task_id>/delete/', views.delete_task, name='delete_task'),
]
