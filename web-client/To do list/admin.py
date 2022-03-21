from django.contrib import admin
from .models import Task, Sharing
from rules.contrib.admin import ObjectPermissionsModelAdmin

# Register your models here.

admin.site.register(Task)
admin.site.register(Sharing)

class BookAdmin(ObjectPermissionsModelAdmin):
    pass
