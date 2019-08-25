import requests
from xml.etree import ElementTree
from . import Config


class TextSpeaker(object):
    def __init__(self, text):
        self.text = text
        self._init_token()

    def _init_token(self):
        headers = {
            'Ocp-Apim-Subscription-Key': Config.SPEECH_KEY
        }
        response = requests.post(Config.SPEECH_FETCH_TOKEN_URL, headers=headers)
        self.access_token = str(response.text)

    def speak(self):
        headers = {
            'Authorization': 'Bearer ' + self.access_token,
            'Content-Type': 'application/ssml+xml',
            'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
            'User-Agent': Config.SPEECH_SERVICE_RESOURCE_NAME
        }
        xml_body = ElementTree.Element('speak', version='1.0')
        xml_body.set('{http://www.w3.org/XML/1998/namespace}lang', 'en-us')
        voice = ElementTree.SubElement(xml_body, 'voice')
        voice.set('{http://www.w3.org/XML/1998/namespace}lang', 'en-US')
        voice.set(
            'name', Config.SPEECH_SERVICE_VOICE_CHOICE)
        voice.text = self.text
        body = ElementTree.tostring(xml_body)

        response = requests.post(Config.SPEECH_SERVICE_URL, headers=headers, data=body)
        response.raise_for_status()  # Will raise HTTPError if there is any
        print("Get audio data")
        return response.content
