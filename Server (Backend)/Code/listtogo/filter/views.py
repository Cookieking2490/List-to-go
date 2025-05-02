from django.http import JsonResponse
from tasks.models import Task

def filter_task(request):
    user_id = request.GET.get("user_id")
    category = request.GET.get("category")

    if not user_id or not category:
        return JsonResponse({"error": "Missing parameters"}, status=400)

    tasks = Task.objects.filter(user_id=user_id, category=category).values()
    return JsonResponse(list(tasks), safe=False)
