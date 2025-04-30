from django.urls import path
from . import views

urlpatterns = [
    path('api/todo/create/', views.create_task, name='api_create_task'),
    path('api/todo/<int:task_id>/edit/', views.edit_task, name='api_edit_task'),   
    path('api/todo/<int:task_id>/delete/', views.delete_task, name='api_delete_task'),
]
