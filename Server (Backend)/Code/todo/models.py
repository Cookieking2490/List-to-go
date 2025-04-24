from django.db import models
from django.conf import settings

class Task(models.Model):
    STATUS_CHOICES = [
        ('complete', 'Complete'),
        ('incomplete', 'Incomplete'),
    ]

    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    # # user = models.ForeignKey(settings.AUTH_USER_MODEL,
    #                           on_delete=models.CASCADE,
    #                           related_name='todo_tasks',)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True) #nullable for now
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='incomplete')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    category = models.CharField(max_length=100)
    due_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name
