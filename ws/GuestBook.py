from flask_socketio import Namespace, emit
import logging

class GuestBookWsHandler(Namespace):
    def on_init(self, data):
        logging.info("connected")
        self.emit('system_event', {'data': 'connected'})

    def on_disconnect(self):
        print("Disconnected")
        pass

    def on_my_event(self, data):
        print('my event', data)
        self.emit('my_response', data)
