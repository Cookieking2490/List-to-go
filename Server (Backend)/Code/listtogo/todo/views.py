from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from tasks.models import CustomUser
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
import json


@csrf_exempt
@login_required
@require_http_methods(["POST"])
def create_task(request):
    try:
        data = json.loads(request.body)
        task = CustomUser.objects.create(
            user=request.user,
            task_name=data.get('task_name'),
            status=data.get('status'),
            priority=data.get('priority'),
            due_time=data.get('due_time'),
            category=data.get('category'),
            progress=data.get('progress', 0),
        )
        return JsonResponse({'message': 'Task created successfully.', 'task_id': task.id}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@login_required
@require_http_methods(["PUT"])
def edit_task(request, task_id):
    try:
        task = CustomUser.objects.get(id=task_id, user=request.user)
        data = json.loads(request.body)
        task.task_name = data.get('task_name', task.task_name)
        task.status = data.get('status', task.status)
        task.priority = data.get('priority', task.priority)
        task.due_time = data.get('due_time', task.due_time)
        task.category = data.get('category', task.category)
        task.progress = data.get('progress', task.progress)
        task.save()
        return JsonResponse({'message': 'Task updated successfully.'})
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'Task not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@login_required
@require_http_methods(["DELETE"])
def delete_task(request, task_id):
    try:
        task = CustomUser.objects.get(id=task_id, user=request.user)
        task.delete()
        return JsonResponse({'message': 'Task deleted successfully.'})
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'Task not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)