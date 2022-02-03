from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    complete = models.BooleanField(default=False)
    create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['complete']
        
class Share(Task):
    share_target = models.ManyToManyField(User, blank=True)
    
class Sharing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    task_name = models.ForeignKey(Task, on_delete=models.CASCADE, null=True, blank=True)
    target = models.CharField(max_length=150)
    
    def __str__(self):
        return self.task_name
