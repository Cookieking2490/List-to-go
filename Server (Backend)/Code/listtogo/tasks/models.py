from django.db import models
from accounts.models import CustomUser

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]

    STATUS_CHOICES = [
        ('On hold', 'On hold'),
        ('Not started', 'Not started'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    task_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True, null=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Not started')
    progress = models.PositiveIntegerField(default=0)
    due_time = models.DateTimeField()

    class Meta:
        db_table = "tasks"

    def __str__(self):
        return self.task_name
