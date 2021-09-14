let show = false;
function toggleLoading(msg) {
    show = !show;

    if (msg) {
        document.getElementById('loadingMsg').innerHTML = msg;
    }

    document.querySelector('.loading').style.display =	show ? 'flex' : 'none';
}

function showToast(msg) {
    let toastMsg = document.getElementById('toastmsg');
    toastMsg.innerText = msg;

    let toast = document.getElementById('liveToast')
    let toastComponent = new bootstrap.Toast(toast)
    toastComponent.show()
}

function createNewMessageNode(msg) {
    let name = msg.username;
    let msgid = msg.id;
    let message = msg.content;
    let creatTime = moment(msg.createdAt / 1000).format('YYYY-MM-DD HH:mm:ss');

    let msgBlock = document.getElementById('messages');

    let noteNode = document.createElement('div');
    noteNode.id = 'msgid-' + msgid;
    noteNode.className = 'note';

    let nameDiv = document.createElement('div');
    nameDiv.className = 'name_area';

    let nameIcon = document.createElement('i');
    nameIcon.classList = 'bi bi-person-fill';

    let nameSpan = document.createElement('span');
    nameSpan.className = 'name'
    nameSpan.innerText = name

    let idSpan = document.createElement('span');
    idSpan.classList = 'id float-end';
    idSpan.innerText = '#' + msgid

    nameDiv.appendChild(nameIcon);
    nameDiv.appendChild(nameSpan);
    nameDiv.appendChild(idSpan);

    noteNode.appendChild(nameDiv);

    let msgArea = document.createElement('div');
    msgArea.className = 'message_area';
    let msgDiv = document.createElement('div');
    msgDiv.innerHTML = message;
    msgArea.appendChild(msgDiv);

    noteNode.appendChild(msgArea);

    let opArea = document.createElement('div');
    opArea.className = 'operation_area';
    let timeSpan = document.createElement('span');
    timeSpan.className = 'float-end';
    timeSpan.innerText = 'Created at ' + creatTime;

    opArea.appendChild(timeSpan);
    noteNode.appendChild(opArea);

    let allNotes = document.querySelectorAll('div.note');

    if (allNotes.length > 0) {
        msgBlock.insertBefore(noteNode, allNotes[0])
    } else {
        msgBlock.appendChild(noteNode);
    }
    document.querySelector('div.end-of-messages').style.display = 'none';
}

function cleanUpInputMessage() {
    document.getElementById('input_message').value = ''
}