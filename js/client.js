const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector('.container')

let audio = new Audio("sound.mp3")

const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == "left"){

        audio.play();
    }
}

const names = prompt("Enter your name to join");
socket.emit('new-user-joined', names);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,"right")
    socket.emit('send',message);
    messageInput.value = ''
})

socket.on('user-joined', names => {
    append(`${names} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', names => {
    append(`${names} left the chat`, 'right')
})
