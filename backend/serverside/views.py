import json

from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.multipartparser import MultiPartParser
from azure_services.ImageAnalyser import ImageAnalyser
from azure_services.TextSpeaker import TextSpeaker
from requests.exceptions import HTTPError
from . import config


class HomeView(TemplateView):
    template_name = "index.html"


class LoginView(TemplateView):
    template_name = 'login.html'


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
        # Get text to speak out
        ans = analyser.analyze()
        caption = ans["description"]["captions"][0]
        print(caption)
        # Get the audio of the text
        speaker = TextSpeaker(caption["text"])
        audio = speaker.speak()
        # Construct response
        res = HttpResponse(audio, content_type='application/octet-stream')
        return res
    except HTTPError as err:
        return Response(f'HTTP error occurred: {err}')


@api_view(['GET', 'POST'])
def analyze_mode(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        print(body)
        config.CURRENT_MODE = body['mode']
        return Response(body['mode'])
    else:
        return Response({'mode': config.CURRENT_MODE})
