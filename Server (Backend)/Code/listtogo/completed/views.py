from django.http import JsonResponse
from tasks.models import Task

def mark_task_completed(request, task_id):
    try:
        task = task.objects.get(id=task_id)

        task.status = 'Completed'
        task.progress = 100
        task.save()
        return JsonResponse({'message': 'Task marked as completed', 'task_id': task.id, 'status': task.status, 'progress': task.progress}, status=200)
    except Task.DoesNotExist:
        return JsonResponse({'error': 'Task not found'}, status=404)
