# RealTime GuestBook (Backend: Python)

Hiskio線上課程作業: [以 Python 打造直播聊天系統｜全面掌握底層知識](https://hiskio.com/courses/439/about)

Development Environment:
* Backend
  * Python 3.9
  * Flask 2.0.1
  * Flask-SocketIO 5.1.1
* Frontend
  * Bootstrap 5.1.1
  * Bootstrap-icons 1.5.0
  * socket.io 4.0.1
  * moment.js 2.29.1

How to Run:
* Run the backend server
```
$ python3 app.py
```

* Open your browsers with the following URL:
```
http://127.0.0.1:5000/
```

Note:
1. All the posts are only kept in memory (no persistent storage in this implementation), so the data won't exist after the server is exited.