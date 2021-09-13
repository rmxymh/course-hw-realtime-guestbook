from flask import Flask, render_template
from flask_socketio import SocketIO
from ws.GuestBook import GuestBookWsHandler

app = Flask(__name__)
app.debug = True

socketio = SocketIO(app)

@app.route('/', methods = ['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.on_namespace(GuestBookWsHandler('/guestbook'))
    socketio.run(app, debug=True, host='127.0.0.1', port=5000)