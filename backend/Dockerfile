FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

WORKDIR /app

COPY server_requirements.txt server_requirements.txt

RUN pip install -r server_requirements.txt

COPY . .

EXPOSE 80

CMD ["python", "server.py", "--host", "0.0.0.0"]