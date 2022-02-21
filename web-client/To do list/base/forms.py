from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import Share, Task ,Sharing
class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True,label='Email')
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)

    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password1','password2')

class SharingForm(forms.ModelForm):
    class Meta:
        model = Sharing
        fields = ('task', 'target')
        
    def __init__(self,user=None,*args,**kwargs):
        super(SharingForm,self).__init__(*args,**kwargs)
        if user:
            self.fields['task'].queryset = Task.objects.filter(user=user)
        
