from django.db import models
from django.contrib.auth.models import User
import rules
from rules.contrib.models import RulesModel
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
        
class Sharing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True, blank=True)
    target = models.CharField(max_length=150)
    view_only = models.BooleanField(default=False)
    def __str__(self):
        return self.target
    
class TestModel(RulesModel):
    class Meta:
        rules_permissions = {"add": rules.always_true, "view": rules.always_true}
        
    @classmethod
    def preprocess_rules_permissions(cls, perms):
        perms["custom"] = rules.always_true
