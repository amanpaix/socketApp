import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

votes = {"yes" : 0, "no": 0, "maybe": 0}
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html", votes=votes)

@socketio.on("submit vote")
def vote(data):
    selection = data['selection']
    votes[selection] += 1
    emit("vote totals", votes, broadcast=True)
