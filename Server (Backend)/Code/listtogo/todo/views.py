from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from tasks.models import Task
from accounts.models import CustomUser
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
from django.core.cache import cache
import json


@csrf_exempt
@require_http_methods(["POST"])
def create_task(request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Token "):
        return JsonResponse({"error": "Unauthorized: Missing or invalid token"}, status=401)

    token = auth_header.split(" ")[1]

    user_id = cache.get(token)
    if not user_id:
        return JsonResponse({"error": "Unauthorized: Token expired or invalid"}, status=401)

    try:
        user = CustomUser.objects.get(id=user_id)

        data = json.loads(request.body)
        task = Task.objects.create(
            user=user,
            task_name=data.get('task_name'),
            status=data.get('status'),
            priority=data.get('priority'),
            due_time=data.get('due_time'),
            category=data.get('category'),
            progress=data.get('progress', 0),
        )
        return JsonResponse({'message': 'Task created.', 'task_id': task.id}, status=201)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
@require_http_methods(["PUT"])
def edit_task(request, task_id):
    # Extract token from Authorization header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Token "):
        return JsonResponse({"error": "Unauthorized: Missing or invalid token"}, status=401)

    token = auth_header.split(" ")[1]

    # Retrieve the user associated with the token from the cache
    user_id = cache.get(token)
    if not user_id:
        return JsonResponse({"error": "Unauthorized: Token expired or invalid"}, status=401)

    try:
        # Get the user object
        user = CustomUser.objects.get(id=user_id)
        
        # Get the task object (only allow the user to edit their own task)
        task = Task.objects.get(id=task_id, user=user)

        # Parse the data from the request body
        data = json.loads(request.body)

        print(f"Received data: {data}")

        # Update task fields
        task.task_name = data.get('task_name', task.task_name)
        task.status = data.get('status', task.status)
        task.priority = data.get('priority', task.priority)
        task.due_time = data.get('due_time', task.due_time)
        task.category = data.get('category', task.category)
        task.progress = data.get('progress', task.progress)
        
        
        # Save the task
        task.save()

        return JsonResponse({"message": "Task updated successfully."}, status=200)


    except Task.DoesNotExist:
        return JsonResponse({'error': 'Task not found.'}, status=404)
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
@require_http_methods(["DELETE"])
def delete_task(request, task_id):
    # Extract token from Authorization header
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Token "):
        return JsonResponse({"error": "Unauthorized: Missing or invalid token"}, status=401)

    token = auth_header.split(" ")[1]

    # Retrieve the user associated with the token from the cache
    user_id = cache.get(token)
    if not user_id:
        return JsonResponse({"error": "Unauthorized: Token expired or invalid"}, status=401)

    try:
        # Get the user object
        user = CustomUser.objects.get(id=user_id)

        # Try to find and delete the task belonging to the user
        task = Task.objects.get(id=task_id, user=user)
        task.delete()

        return JsonResponse({'message': 'Task deleted successfully.'}, status=200)

    except Task.DoesNotExist:
        return JsonResponse({'error': 'Task not found.'}, status=404)
    except CustomUser.DoesNotExist:
        return JsonResponse({'error': 'User not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
