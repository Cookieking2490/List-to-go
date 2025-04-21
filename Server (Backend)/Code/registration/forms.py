from django import forms
from accounts.models import CustomUser
from django.contrib.auth.hashers import make_password

class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ['username','email','password','first_name','last_name']

    def save(self, commit=True):
        user = super().save(commit=False)
        
        if commit:
            user.save()
        return user
