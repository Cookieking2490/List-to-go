from django import forms
from .models import User
from django.contrib.auth.hashers import make_password

class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

    def save(self, commit=True):
        user = super().save(commit=False)\
        
            # Hash the password
        user.password = make_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user
