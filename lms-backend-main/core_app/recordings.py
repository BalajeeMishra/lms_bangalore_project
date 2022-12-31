import requests
import os
from tqdm import tqdm

from core_app.generate_token import generate_token

DOWNLOAD_DIRECTORY = "./Recordings"
base_url = "https://api.zoom.us/v2"


def get_meeting_attendance(meeting_id):
    url = base_url + "/meetings/" + meeting_id + "/participants"
    response = requests.get(
        url, headers={'Authorization': 'Bearer ' + generate_token()}).json()
    return response.get('participants')


def get_meeting_recording(meeting_id):
    url = base_url + "/meetings/" + meeting_id + "/recordings"

    response = requests.get(
        url, headers={'Authorization': 'Bearer ' + generate_token()}).json()
    file_download_link = [recording['download_url'] for recording in response.get(
        'recording_files') if recording['file_type'] == "MP4"]
    print(file_download_link)
    return file_download_link


def download_recording(download_url, filename):
    dl_dir = os.sep.join([DOWNLOAD_DIRECTORY])
    full_filename = os.sep.join([dl_dir, filename])
    os.makedirs(dl_dir, exist_ok=True)
    response = requests.get(
        download_url + "?access_token=" + generate_token(), stream=True)

    # total size in bytes.
    total_size = int(response.headers.get('content-length', 0))
    block_size = 32 * 1024  # 32 Kibibytes

    # create TQDM progress bar
    t = tqdm(total=total_size, unit='iB', unit_scale=True)
    try:
        with open(full_filename, 'wb') as fd:
            # with open(os.devnull, 'wb') as fd:  # write to dev/null when testing
            for chunk in response.iter_content(block_size):
                t.update(len(chunk))
                fd.write(chunk)  # write video chunk to disk
        t.close()
        return True
    except Exception as e:
        # if there was some exception, print the error and return False
        print(e)
        return False


try:
    download_link = get_meeting_recording("86878134309").pop()
    print(download_link)
    download_recording(download_link, "Test_Download_latest_86119440918.MP4")
except Exception as e:
    print(e)
