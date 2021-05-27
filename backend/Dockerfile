FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

WORKDIR /app

COPY server_requirements.txt server_requirements.txt

RUN pip install -r server_requirements.txt

EXPOSE 8000

COPY . .

CMD ["python", "server.py"]