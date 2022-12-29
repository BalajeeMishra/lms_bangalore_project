from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
import boto3
from botocore.exceptions import NoCredentialsError


def send_mail_to_user(subject, body, sender_mail_id):
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [sender_mail_id, ]


    merge_data = {
        'link': body['link'],
    }

    html_body = render_to_string("reset_email_layout.html", {"data":merge_data})
    message = EmailMultiAlternatives(
        subject=subject,
        body=subject,
        from_email=email_from,
        to=recipient_list
    )
    message.attach_alternative(html_body, "text/html")
    message.send(fail_silently=False)
    return True

ACCESS_KEY = settings.AWS_KEY
SECRET_KEY = settings.AWS_SEC

def upload_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    print("----->4")
    # try:
    s3.upload_fileObj(local_file, bucket, s3_file)
    print("Upload Successful")
    return True
    # except FileNotFoundError:
    #     print("The file was not found")
    #     return False
    # except NoCredentialsError:
    #     print("Credentials not available")
    #     return False

# def send_mail_to_user(subject, body, sender_mail_id):
#     subject = subject
#     message = f'''
#     <b>Hi {sender_mail_id}, thank you for registering in geeksforgeeks.</b>
#     <a href={body['link']}>some link</a>
#     '''
#     email_from = settings.EMAIL_HOST_USER
#     recipient_list = [sender_mail_id, ]
#     send_mail(subject, message, email_from, recipient_list)
#     return True


def html_send_mail(subject, body, sender_mail_id):
    email_from = settings.EMAIL_HOST_USER
    recipient_list = sender_mail_id

    html_body = render_to_string("enquire.html", body)
    message = EmailMultiAlternatives(
        subject=subject,
        body=subject,
        from_email=email_from,
        to=recipient_list
    )
    message.attach_alternative(html_body, "text/html")
    message.send(fail_silently=False)
    return True
