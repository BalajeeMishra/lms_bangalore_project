import codecs
import boto3
import os
from botocore.exceptions import ClientError, NoCredentialsError
from django.conf import settings


ACCESS_KEY = settings.AWS_KEY
SECRET_KEY = settings.AWS_SEC
AWS_BUCKET = settings.BUCKET_NAME


def upload_file_to_storage(file_path, bucket_name=AWS_BUCKET):
    try:
        s3 = boto3.resource('s3')
        bucket = s3.Bucket(bucket_name)
        bucket.upload_file(Key=os.path.split(
            file_path)[-1], Filename=file_path)
    except Exception as e:
        print(e)


def list_files_from_storage(bucket_name=AWS_BUCKET):
    try:
        s3 = boto3.resource('s3')
        bucket = s3.Bucket(bucket_name)
        for my_bucket_object in bucket.objects.all():
            print(my_bucket_object)
    except Exception as e:
        print(e)


def download_files_from_aws(files, bucket_name=AWS_BUCKET):
    try:
        for file in files:
            s3 = boto3.client('s3')
            s3.download_file(bucket_name, file, file)
    except Exception as e:
        print(e)


# upload_file_to_storage("/Users/shassan/Downloads/Backend/LMS/core_app/Recordings/Test_Download_latest_86119440918.MP4")
list_files_from_storage()
# download_files_from_aws(['Test_Download.MP4'])


def upload_assessment_file(file, path, bucket_name=AWS_BUCKET):
    # Upload the file
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    if settings.ENV == "Dev":
        path = "Dev/"+path
    else:
        path = path
    try:
        response = s3.upload_fileobj(
            file, bucket_name, path)
    except ClientError as e:
        print("Error", e)
        return False
    return True


def get_assessment_files(path, course_id=None, bucket_name=AWS_BUCKET):
    # List of file
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    if settings.ENV == "Dev":
        prefix = "Dev/"+path
    else:
        prefix = path
    try:
        if course_id is not None:
            prefix = prefix+str(course_id)+"/"
        get_all = s3.list_objects(Bucket=bucket_name, Prefix=prefix)
        list = []
        if get_all.get('Contents') is not None:
            for o in get_all.get('Contents'):

                if o['Size'] > 0:
                    temp = o['Key'].replace(path, "").split("/")
                    obj = {
                        "Key": o['Key'],
                        "course_id": temp[1] if settings.ENV == "Dev"else temp[0],
                        "file_name": temp[2] if settings.ENV == "Dev"else temp[1]}
                    list.append(obj)
        return list
    except ClientError as e:
        print("Error", e)
        return []


def download_assessment_file(path, bucket_name=AWS_BUCKET):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)

    try:
        # response = s3.download_file(Bucket=bucket_name, Key=path)
        # data = TextIOWrapper(StreamingBodyIO(response))

        # for line in response.get()['Body']._raw_stream:
        #     print(line)
        # print(response)
        # s3.download_file(bucket_name, path, 'FILE_NAME')

        # with open('FILE_NAME', 'wb') as f:
        #     print(s3.download_fileobj(bucket_name, path, f))
        response = s3.get_object(Bucket=bucket_name, Key=path)
        return response
        # print(response)
        # contents = response['Body'].read()
        # print(contents.decode("utf-8"))
    except ClientError as e:
        print("Error", e)
        return False


def upload_to_s3(local_file, s3_file, bucket=AWS_BUCKET):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    try:
        s3.upload_fileobj(local_file, bucket, s3_file)
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False


def get_video_files(path, course_id=None, bucket_name=AWS_BUCKET):
    # List of file
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    if settings.ENV == "Dev":
        prefix = "Dev/"+path
    else:
        prefix = path
    try:
        if course_id is not None:
            prefix = prefix+str(course_id)+"/"
        get_all = s3.list_objects(Bucket=bucket_name, Prefix=prefix)
        list = []
        if get_all.get('Contents') is not None:
            for o in get_all.get('Contents'):

                if o['Size'] > 0:
                    temp = o['Key'].replace(path, "").split("/")
                    obj = {
                        "Key": o['Key'],
                        "course_id": temp[1] if settings.ENV == "Dev" else temp[0],
                        "file_name": temp[2] if settings.ENV == "Dev" else temp[1]}
                    list.append(obj)
        return list
    except ClientError as e:
        print("Error", e)
        return []
