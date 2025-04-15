from django.shortcuts import render
import random
from django.core.mail import send_mail
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

User = get_user_model()
reset_codes = {}

@csrf_exempt
def send_reset_code(request):
    """Sends a 6-digit reset code to the user's email."""
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")

        try:
            user = User.objects.get(email=email)
            reset_code = random.randint(100000, 999999)  # Generate 6-digit code
            reset_codes[email] = reset_code  # Store code temporarily

            send_mail(
                "Password Reset Code",
                f"Your password reset code is: {reset_code}",
                "your-email@gmail.com",
                [email],
                fail_silently=False,
            )
            return JsonResponse({"message": "Reset code sent!"}, status=200)

        except User.DoesNotExist:
            return JsonResponse({"error": "Email not found"}, status=404)

    return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def verify_reset_code(request):
    """Verifies the entered reset code."""
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        code = int(data.get("code"))

        if email in reset_codes and reset_codes[email] == code:
            return JsonResponse({"message": "Code verified!"}, status=200)
        else:
            return JsonResponse({"error": "Invalid code"}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)


@csrf_exempt
def reset_password(request):
    """Allows the user to reset their password if the code was verified."""
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        new_password = data.get("new_password")

        if email in reset_codes:
            try:
                user = User.objects.get(email=email)
                user.set_password(new_password)
                user.save()
                del reset_codes[email]  # Remove the code after reset
                return JsonResponse({"message": "Password reset successful!"}, status=200)

            except User.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)

    return JsonResponse({"error": "Invalid request"}, status=400)
