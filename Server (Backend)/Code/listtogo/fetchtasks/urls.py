from django.urls import path
from . import views

urlpatterns = [
    path('task-list/<int:user_id>/', views.task_list, name='task-list'),
]
