from django.shortcuts import render
from .forms import *
from django.http import JsonResponse
from .models import *
# Create your views here.

def mainView(request):
    form = ImageForm(request.POST or None,request.FILES or None)
    if form.is_valid():
        form.save()
        return JsonResponse({'message':'works'})
    context = {
        'form':form,
    }
    return render(request, 'images/main.html',context)

