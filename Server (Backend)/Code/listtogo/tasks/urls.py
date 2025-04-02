from django.urls import path
from .views import search_tasks

urlpatterns=[
    path('search/',search_tasks,name="search_tasks"),
]