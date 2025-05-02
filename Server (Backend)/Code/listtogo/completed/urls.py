from django.urls import path
from . import views

urlpatterns = {
    path('complete_task/<int:task_id>/', views.mark_task_completed, name='complete_task'),
}
