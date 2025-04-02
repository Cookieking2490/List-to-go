from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.db import connection

@csrf_exempt

def search_tasks(request):
    if request.method =="GET":
        task_name=request.GET.get("task_name","")

        if not task_name:
            return JsonResponse({"error":"Task name doesn't exist"},status=400)
        
        with connection.cursor() as cursor:
            cursor.execute(
                "Select task_name, category, priority, due_time FROM tasks WHERE task_name LIKE %s",[f"%{task_name}%"]
            )
            tasks=cursor.fetchall()
        
        task_list= [
                {"task_name":row[0], "category":row[1], "priority":row[2], "due_time":row[3]}
                for row in tasks
        ]
        
        return JsonResponse({"tasks":task_list},status=200)
    
    return JsonResponse({"error":"Invalid request"},status= 405)


