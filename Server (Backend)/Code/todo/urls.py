from django.urls import path
from . import views

urlpatterns = [
    path('create-task/', views.create_task, name='create_task'),
    path('task-list/', views.task_list, name='task_list'),
    path('edit-task/<int:task_id>/', views.edit_task, name='edit_task'),
    path('delete-task/<int:task_id>/', views.delete_task, name='delete_task'),

]