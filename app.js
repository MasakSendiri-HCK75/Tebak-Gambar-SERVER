const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 3000
const app = express();

/**
 
Disini klo mau bikin middleware
*/
const cors = require('cors')
app.use(cors())


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

let leaderBoard = [];
let users = [];

io.on("connection", (socket) => {
    // ...
    console.log('a user connected', socket.id);

    socket.on('removeUserFromRoom', (socketId) => {
        console.log(socketId, "Socket Id yang mau dihapus");

        console.log(users, "Sebelum Filter");
        // console.log(socketId, "Ini Socket ID dalam func Socket LeaveRoom");

        users = users.filter(user => user.socketId !== socketId);
        console.log(users, "Setelah Filter");
        io.emit('UsersRemaining', users);
    });

    socket.on('username', (username) => {
        users.push({ username, socketId: socket.id });

        io.emit('Greetings with username', {
            message: `Hello ${username}, welcome to the game `,
            users

        });
    });

    socket.on("leaderBoard:broadcast", ({username, score}) => {
        leaderBoard.push({username, score});
        console.log(leaderBoard, "==== II ini leaderboard");

        io.emit('showLeaderBoard:broadcast', leaderBoard);
    }); 

    socket.on('GameStart', () => {
        io.emit('StartTheGame')
    });
});

httpServer.listen(port, () => console.log(`Listening to port ${port}`));