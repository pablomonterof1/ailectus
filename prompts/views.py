from django.shortcuts import render

# Create your views here.

def promts(request):
    return render(request, 'generador.html')