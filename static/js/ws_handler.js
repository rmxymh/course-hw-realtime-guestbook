let socket = null;

function ws_on_new_post(data) {
    createNewMessageNode(data);
    showToast('New post is created.');
}

function ws_on_old_post_response(data) {
    for(let i = 0; i < data.posts.length; i++) {
        createNewMessageNode(data.posts[i]);
    }
    showToast('Load ' + data.posts.length + ' old posts.')
    if (document.querySelectorAll('div.note').length == 0) {
        document.querySelector('div.end-of-messages').style.display = 'block';
    }
    toggleLoading()
}

function ws_on_create_post_result(data) {
    toggleLoading()
    if (data.success) {
        createNewMessageNode(data);
        cleanUpInputMessage();
        showToast('Your post is created successfully.');
    } else {
        showToast('Create post failed, please try again later.');
    }
}

function ws_create_post(data) {
    toggleLoading('Your post is creating...')
    socket.emit('post_message', data);
}

function ws_init() {
    toggleLoading('Establish connection...')
    socket = io("ws://127.0.0.1:5000/guestbook");
    socket.on('old_post_response', ws_on_old_post_response);
    socket.on('create_post_result', ws_on_create_post_result);
    socket.on('new_post', ws_on_new_post);

    socket.emit('init', {});
}
