from flask import Flask
import os

app = Flask(__name__)


@app.route("/")
def hello():
    host_name = os.getenv("HOSTNAME")
    return f"response from Flask APP - {host_name}!!!"
