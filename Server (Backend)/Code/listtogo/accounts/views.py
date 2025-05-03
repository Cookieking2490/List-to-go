from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser  
import secrets  # for token generation
from django.core.cache import cache  # optional: store token->user_id mapping

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = data.get("password")

        try:
            user = CustomUser.objects.get(username=username)  
            if user.password == password: 
                token = secrets.token_hex(16)

                
                cache.set(token, user.id, timeout=3600)
                return JsonResponse({
                    "status": "Success",
                    "message": "Login successful",
                    "user_id": user.id,
                    "token": token 
                })
            else:
                return JsonResponse({"status": "Error", "message": "Invalid password"}, status=401)
        except CustomUser.DoesNotExist:
            return JsonResponse({"status": "Error", "message": "User not found"}, status=404)

    return JsonResponse({"status": "Error", "message": "Invalid request"}, status=400)
