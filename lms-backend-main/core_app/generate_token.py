import jwt
import datetime
import requests
import json
from django.conf import settings

API_KEY = settings.API_KEY
API_SEC = settings.API_SEC

time_now = datetime.datetime.now()
expiration_time = time_now+datetime.timedelta(minutes=20)
expiration_in_seconds = round(expiration_time.timestamp())

headers = {"alg": "HS256","typ": "JWT"}
payload = {"iss": API_KEY,"exp": expiration_in_seconds}

request_token = jwt.encode(payload, API_SEC, algorithm="HS256", headers=headers)



def generate_token():
    token = jwt.encode(

        # Create a payload of the token containing
        # API Key & expiration time
        {'iss': API_KEY, 'exp': round(expiration_time.timestamp()+5000)},

        # Secret used to generate token signature
        API_SEC,

        # Specify the hashing alg
        algorithm='HS256'
    )
    return token
