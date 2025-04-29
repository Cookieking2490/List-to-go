from django.urls import path
from . import views

urlpatterns = {
    path('filter_task/<int:user_id>/<str:category>', views.filter_task, name='filter_task')
}