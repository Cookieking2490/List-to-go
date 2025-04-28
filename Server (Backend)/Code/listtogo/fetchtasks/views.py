# Create your views here.
from django.http import JsonResponse
from tasks.models import Task

def task_list_api(request, user_id):
    tasks = Task.objects.filter(user_id=user_id).values()
    return JsonResponse(list(tasks), safe=False)
