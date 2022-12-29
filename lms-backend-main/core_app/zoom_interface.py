from django.conf import settings
from core_app.generate_token import generate_token
from core_app.models import ZoomMeetinRecording
import requests
import os
base_url = "https://api.zoom.us/v2"


def get_video_by_id(meeting_id):
    url = base_url + "/meetings/" + meeting_id + "/recordings"

    response = requests.get(
        url, headers={'Authorization': 'Bearer ' + generate_token()}).json()
    # print(response)
    if "code" in response:
        return response['message']
    else:
        list = []
        if "recording_files" in response:
            for record in response['recording_files']:
                if record['file_type'] == 'MP4':
                    list.append(
                        {"download_url": record['download_url'], "stream": record['download_url'] + "?access_token=" + generate_token()})

        return list
