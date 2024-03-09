const socket = io();
let container = document.querySelector(".container");
let sendBtn = document.querySelector(".send-btn");
let messageBox = document.querySelector(".msg-txt");
let chatBody = document.querySelector(".chat-msg");

let cookie = document.cookie
let username = cookie.split('=')[1];

sendBtn.addEventListener("click", () => {
    if (messageBox.value) {
        socket.emit("message", messageBox.value , username);
        messageBox.value = "";
    }
})

messageBox.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        if (messageBox.value) {
            socket.emit("message", messageBox.value , username);
            messageBox.value = "";
        }
    }
})

socket.on("message-receive", (username, msg) => {
    console.log("emitting");
    let p = document.createElement("p");
    p.textContent = username + " : " + msg;
    chatBody.appendChild(p);
    messageBox.scrollTop = messageBox.scrollHeight;
    container.scrollTop = container.scrollHeight;

})