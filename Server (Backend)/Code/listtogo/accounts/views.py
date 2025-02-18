from django.shortcuts import render
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.
@csrf_exempt
def login_view(request):
    if request.method=="POST":
        data= json.loads(request.body)
        username= data.get("username")
        password=data.get("password")
        user= authenticate(username=username,password=password)
        if user:
            return JsonResponse({"message":"Login succesful"},status=200)
        return JsonResponse({"message":"Invalid credentials"},status=401)
    return JsonResponse({"error":"Invalid request"},status=400)