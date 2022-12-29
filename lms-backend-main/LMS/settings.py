"""
Django settings for LMS project.

Generated by 'django-admin startproject' using Django 3.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta

import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-tl-gy%-w^z*@113k7lg0mpc6z_%m#*%+e0y(_a13o*i)*u20py'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

USE_TZ = True
TIME_ZONE = 'Asia/Kolkata'

# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'core_app',
    'authentication',
    'products',
    'purchase',
    'coupons'
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'LMS.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'LMS.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
# DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': BASE_DIR / 'db.sqlite3',
#    }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'lms_prod',
        'USER': 'postgres',
        'PASSWORD': 'abc123',
        # 'PASSWORD': 'CaprA4rEgEbRUtrIxAch',
        # 'HOST': '3.111.73.127',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# AUTH_USER_MODEL  = 'core_app.UserInformation'

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    # 'DEFAULT_PERMISSION_CLASSES': [
    #     # 'rest_framework.permissions.AllowAny',
    #     'rest_framework.permissions.IsAdminUser'
    # ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],

}


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/
STATIC_ROOT = "app-root/repo/wsgi/static"
STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# JWT_AUTH = {
#     # how long the original token is valid for
#     'JWT_EXPIRATION_DELTA': timedelta(days=2),

#     # allow refreshing of tokens
#     'JWT_ALLOW_REFRESH': True,

#     # this is the maximum time AFTER the token was issued that
#     # it can be refreshed.  exprired tokens can't be refreshed.
#     'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),
# }

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=10),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=20),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(days=10),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=20),
}


# SIMPLE_JWT = {
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=15),
#     'ROTATE_REFRESH_TOKENS': True,
# }

CORS_ALLOW_ALL_ORIGINS = True
APPEND_SLASH = False


# Updated Credentials
# API_KEY = '2GXDBT-FQpqFiwhaDfkvnA'
# API_SEC = 'X2mZJGZA2wmrjy0LAMjgGRa9HjSnTE0xKnde'

# old credentials of zoom
API_KEY = 'pxo3_0CnRw6UwCaPRz1zsA'
API_SEC = 'qOt6ErhMgoZQXaHaVQ4TsE812NyAXKxxU4Fb'

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = "lmsaiml24@gmail.com"
EMAIL_HOST_PASSWORD = 'shpvznmaptwyryzl'
ENCRYPTION_KEY = "K125jgktQC-7Algihk0xO9MbrshfUx2-PTE-ztjHJIg="


AWS_KEY = "AKIAZCLTTESHN4SB4G4W"
AWS_SEC = "AQJRlgxbSDVbY4/8Vd1VXkvhgRC3/5iGug04A6YF"

# AWS_KEY="AKIAW4HSXEZSULA24FWL"
# AWS_SEC="FZFTIAWHgO2qePQu3S6AlBmGUl9B9DDG+SU9KBEN"


# AWS_KEY="AKIAW4HSXEZSULA24FWL"
# AWS_SEC="FZFTIAWHgO2qePQu3S6AlBmGUl9B9DDG+SU9KBEN"

BUCKET_NAME = "sambodhieducationnestss3"
# BUCKET_NAME="lms-utilitie-bucket"
S3_LINK = "https://lms-utilitie-bucket.s3.ap-south-1.amazonaws.com/"


# HOST_URL = "http://lmsmle.educationnest.com"
HOST_URL = "http://127.0.0.1:3000"
ENV = "Prod"


CC_AVENUE_WORKING_KEY = "7500363381B503AE4D6BF9689EF219EC"
CC_AVENUE_MERCHANT_ID = "9002"
CC_AVENUE_ACCESS_CODE = "AVHV68DL41BQ21VHQB"
CC_AVENUE_REDIRECT_URL = "http://localhost/checkout"
CC_AVENUE_CANCEL_URL = "http://localhost/checkout"

TEXT_DECODE_SECRET_KEY = 'rHPbPJBI8ZeTGBZqrhX8yDDiFrAom9aTDui1omgX7hg='

COUPON_PERMISSIONS = {
    'CREATE': ['groupa', 'groupb'],
    'LIST': ['groupa'],
    'DELETE': ['groupb'],
    'UPDATE': ['groupb'],
    'REDEEMED': ['groupc'],
}
