from django.shortcuts import render, redirect, get_object_or_404
from .forms import TaskForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from .models import Task
from datetime import date


# @login_required 
def create_task(request):
    form = TaskForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        task = form.save(commit=False)
        task.user = request.user  # assign the logged-in user
        task.save()
        return redirect('task_list')
    return render(request, 'todo/create_task.html', {'form': form})


def task_list(request):
    tasks = Task.objects.filter(user=request.user)
    return render(request, 'todo/task_list.html', {'tasks': tasks})

def edit_task(request, task_id):
    task = get_object_or_404(Task, id=task_id,user=request.user)
    if request.method == "POST":
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect('task_list')
    else:
        form = TaskForm(instance=task)
    return render(request, 'todo/edit_task.html', {'form': form, 'task': task})

def delete_task(request, task_id):
    task = get_object_or_404(Task, id=task_id,user=request.user)
    if request.method == "POST":
        task.delete()
        return redirect('task_list')
    return render(request, 'todo/delete_task.html', {'task': task})