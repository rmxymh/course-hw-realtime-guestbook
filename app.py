from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
from ws.GuestBook import GuestBookWsHandler
from post import PostManagement

app = Flask(__name__, static_folder='static')
app.debug = True

socketio = SocketIO(app)

@app.route('/', methods = ['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    postManager = PostManagement()
    socketio.on_namespace(GuestBookWsHandler('/guestbook', postManager))
    socketio.run(app, debug=True, host='127.0.0.1', port=5000)