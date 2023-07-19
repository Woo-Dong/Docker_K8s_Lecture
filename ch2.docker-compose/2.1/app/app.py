from flask import Flask
import redis

import os

app = Flask(__name__)
cache = redis.Redis(host=os.getenv("REDIS_HOST"), port=6379)


def get_hit_count():
    return cache.incr("hits")


@app.route("/")
def hello():
    count = get_hit_count()
    return "Hello World! I have been seen {} times.\n".format(count)
