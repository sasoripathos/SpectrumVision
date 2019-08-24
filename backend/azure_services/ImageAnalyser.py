import requests
import json

from . import Config


class ImageAnalyser:
    def __init__(self, img):
        self._img = img
        self._analyze_url = Config.VISION_BASE_URL + "analyze"

    def analyze(self):
        headers = {
            'Ocp-Apim-Subscription-Key': Config.VISION_KEY,
            'Content-Type': 'application/octet-stream'
        }
        params = {
            'visualFeatures': 'Description'
        }
        response = requests.post(self._analyze_url, headers=headers, params=params, data=self._img)
        response.raise_for_status()  # Will raise HTTPError if there is any
        result = response.json()
        return result
