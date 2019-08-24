from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.multipartparser import MultiPartParser
from azure_services.ImageAnalyser import ImageAnalyser
from requests.exceptions import HTTPError


class HomeView(TemplateView):
    template_name = "index.html"


# Create your views here.
class AnalyzeModeView(APIView):
    def get(self, request, format=None):
        print('hello')


@api_view(['POST'])
def analyze_image(request):
    file = request.FILES["image"].file
    print(file)
    analyser = ImageAnalyser(file)
    try:
        ans = analyser.analyze()
        caption = ans["description"]["captions"]
        print(caption)
        return Response(caption)
    except HTTPError as err:
        return Response(f'HTTP error occurred: {err}')


@api_view(['GET','POST'])
def analyze_mode(request):
        print('he')
        return Response(request.data)
