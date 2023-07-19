FROM python:3.9-alpine

ENV FLASK_APP=app.py

ENV FLASK_RUN_HOST=0.0.0.0

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

ENTRYPOINT [ "flask", "run" ]