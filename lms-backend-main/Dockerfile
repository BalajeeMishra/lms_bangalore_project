FROM python:3.9
WORKDIR /backend
COPY . .
RUN pip install --no-cache-dir -r requirements.txt

# RUN python3 manage.py makemigrations
# RUN python3 manage.py migrate

# RUN python3 manage.py makemigrations core_app
# RUN python3 manage.py migrate core_app

# RUN python3 manage.py makemigrations products
# RUN python3 manage.py migrate products

# RUN python3 manage.py makemigrations purchase
# RUN python3 manage.py migrate purchase

# RUN python3 manage.py makemigrations
# RUN python3 manage.py migrate

# RUN python manage.py collectstatic
# Expose ports
EXPOSE 8000
# default command to execute    
#CMD ["python3", "manage.py", "runserver", "0.0.0.0:8001"] 
# CMD exec gunicorn LMS.wsgi:application --bind 0.0.0.0:8000 --workers 3 
CMD "./backendsetup.sh"

