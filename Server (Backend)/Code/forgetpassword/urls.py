from django.urls import path
from .views import send_reset_code, verify_reset_code, reset_password

urlpatterns = [
    path("send-reset-code/", send_reset_code, name="send-reset-code"),
    path("verify-reset-code/", verify_reset_code, name="verify-reset-code"),
    path("reset-password/", reset_password, name="reset-password"),
]
