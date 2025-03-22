from django.shortcuts import render, redirect
from .forms import RegistrationForm
from django.contrib import messages


def register(request):
    form = RegistrationForm()
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "You have registered successfully!")
        else:
            messages.error(request, "Registration failed!")
        return redirect('register')

    return render(request, 'registration/register.html', {'form': form, })
