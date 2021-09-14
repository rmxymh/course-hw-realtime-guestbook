from os import name
from flask_socketio import Namespace, emit, join_room
from flask import request
import logging

class GuestBookWsHandler(Namespace):
    def __init__(self, namespace, postMgr):
        super(GuestBookWsHandler, self).__init__(namespace)
        self.postManager = postMgr
        self.clients = set()

    def on_init(self, data):
        self.clients.add(request.sid)
        join_room(request.sid)
        join_room('global')
        posts = self.postManager.getHistoricalPost()
        self.emit('old_post_response', {'posts': posts}, room=request.sid)

    def on_disconnect(self):
        try:
            self.clients.remove(request.sid)
        except:
            pass

    def on_post_message(self, data):
        try:
            name = data['name']
            content = data['content']
            post = self.postManager.addPost(name, content)
            data = {
                'success': True,
                'username': post.username,
                'id': post.id,
                'content': post.content,
                'createdAt': post.createdAt
            }
            self.emit('create_post_result', data, room=request.sid)
            self.emit('new_post', data, room='global', include_self=False)
        except Exception as e:
            logging.error(e)
            data = {
                'success': False
            }
            self.emit('create_post_result', data, room=request.sid)

