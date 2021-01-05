from django.shortcuts import render

# Create your views here.
from .models import Product
# Create your views here.
def home_view(request):
    context = {'products':Product.objects.all()}
    return render(request, 'index.html', context)