from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response

class HomeView(TemplateView):
    template_name = "index.html"

# Create your views here.
class AnalyzeModeView(APIView):
        def get(self,request,format=None):
                print('hello')
@api_view(['POST'])
def analyze_image(request):
    print('he')
    if request.method == 'POST':
        data = request.data
        value = data.get('image')
        print(value)
        return Response(data)
        
@api_view(['GET','POST'])
def analyze_mode(request):
        print('he')
        return Response(request.data)