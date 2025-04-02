from django.shortcuts import render, redirect
from .forms import RegistrationForm
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
@csrf_exempt
def register(request):
    if request.method == "POST":
        data = json.loads(request.body) 
        form = RegistrationForm(data)
        if form.is_valid():
            form.save()
            return JsonResponse({"message": "Registration successful!"}, status=201)
        else:
            return JsonResponse({"error": form.errors}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)
