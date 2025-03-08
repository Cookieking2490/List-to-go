from django.db import models
from accounts.models import CustomUser

class Task(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    task_name= models.CharField(max_length=255)
    category=models.CharField(max_length=100,blank=True,null=True)
    priority=models.IntegerField()
    due_time=models.DateTimeField()

    class Meta:
        db_table="tasks"

    def __str__(self):
        return self.task_name


# Create your models here.
