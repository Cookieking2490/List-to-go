from django.http import JsonResponse
from tasks.models import Task

def filter_task(request, user_id, category):
    category = request.GET.get("category")
    tasks = Task.objects.filter(user_id=user_id, category = category).values()
    return JsonResponse(list(tasks), safe=False)

