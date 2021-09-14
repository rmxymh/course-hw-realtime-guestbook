from datetime import datetime
from uuid import uuid4
import json

class Post:
    def __init__(self, username, content):
        self.id = str(uuid4())
        self.username = username
        self.content = content
        self.createdAt = datetime.now().timestamp() * 1000000

class PostManagement:
    def __init__(self):
        self.posts = []

    def addPost(self, name, content):
        post = Post(name, content)
        self.posts.append(post)
        return post

    def getHistoricalPost(self):
        resp = []
        for post in self.posts:
            resp.append({
                'id': post.id,
                'username': post.username,
                'content': post.content,
                'createdAt': post.createdAt
            })
        return resp
    
