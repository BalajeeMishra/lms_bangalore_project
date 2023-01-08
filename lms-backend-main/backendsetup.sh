RUN python3 manage.py makemigrations
RUN python3 manage.py migrate

python3 manage.py makemigrations core_app
python3 manage.py migrate core_app

python3 manage.py makemigrations products
python3 manage.py migrate products

python3 manage.py makemigrations purchase
python3 manage.py migrate purchase

python3 manage.py makemigrations
python3 manage.py migrate

python3 manage.py collectstatic --no-input
# Expose ports
# EXPOSE 8000
# default command to execute    
#CMD ["python3", "manage.py", "runserver", "0.0.0.0:8001"] 
exec gunicorn LMS.wsgi:application --bind 0.0.0.0:8000 --workers 3 