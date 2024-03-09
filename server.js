import express from 'express'
import { createServer } from 'http'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'
import { Server } from 'socket.io'


const PORT = process.env.PORT || 10000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const io = new Server(server);

let username;
let roomId;

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'login.html'));
})

app.get("/index.html", (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
})

app.get("/client.js", (req, res) => {
    res.sendFile(join(__dirname, 'client.js'));
})

app.get("/style.css", (req, res) => {
    res.sendFile(join(__dirname, 'style.css'));
})

app.post("/index.html", (req, res) => {
    let data = "";
    req.on("data", (d) => {
        data = d.toString();
        console.log(data);
    })

    req.on("end", () => {
        username = data.split("&")[0].split("=")[1];
        roomId = data.split("&")[1].split("=")[1];
    })

    req.on("close", () => {
        res.cookie("username", username);
        res.sendFile(join(__dirname, 'index.html'));

    })
})

io.on('connection', (socket) => {
    console.log("Connection formed");


    socket.on("message", (msg ,username) => {
        console.log(`message:  ${msg}`)

        io.emit("message-receive", username, msg);
    })

    socket.on('disconnect', () => {
        console.log("Connection closed");
    })


})



server.listen(PORT, () => {
    
})
