from django.db.models.base import Model
from django.shortcuts import render,redirect
from .models import Post, Task
from django.contrib.auth.models import User,auth
from django.contrib import messages
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView

# Create your views here.
def hello(request):
    data = Task.objects.all()
    return render(request,'index.html',{'tasks':data})

def page1(request):
    return render(request,'page1.html')

def createForm(request):
    return render(request,'form.html')

def loginForm(request):
    return render(request,'login.html')

def addUser(request):
    username=request.POST['username']
    firstname=request.POST['firstname']
    lastname=request.POST['lastname']
    email=request.POST['email']
    password=request.POST['password']
    repassword=request.POST['repassword']

    if password==repassword:
        if User.objects.filter(username=username).exists():
            messages.info(request,'This Username is already used.')
            return redirect('/createForm')
        elif User.objects.filter(email=email).exists():
            messages.info(request,'This Email is already used.')
            return redirect('/createForm')
        else :
            user=User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=firstname,
            last_name=lastname
            )
            user.save()
            return redirect('/')
    else :
        messages.info(request,'Password not matching.')
        return redirect('/createForm')

def addTodo(request):
    title = request.GET['title']
    description = request.GET['description']
    task = Task.objects.create_task(
        title=title,
        description=description
    )
    task.save()
    return redirect('/')

def login(request):
    username=request.POST['username']
    password=request.POST['password']

    #check username,password
    user=auth.authenticate(username=username,password=password)

    if user is not None :
        auth.login(request,user)
        return redirect("/")
    else:
        messages.info(request,'ID not Found')
        return redirect('/loginForm')

def logout(request):
    auth.logout(request)
    return redirect("/")

class TaskList(ListView):
    model=Task
    context_object_name = 'tasks'
    template_name = 'templates/task_list.html'

class TaskDetail(DetailView):
    model=Task
    #context_object_name = 'task'
    #template_name = 'templates/task.html'

class TaskCreate(CreateView):
    model=Task