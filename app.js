const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const port = 3000
const app = express();

/**
 * Disini klo mau bikin middleware
 * 
 */
const cors = require('cors')
app.use(cors())


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

let users = [];

let  leaderBoard = [];

io.on("connection", (socket) => {
    // ...
    console.log('a user connected', socket.id);

    io.emit("Greetings", {
        message: `User with id ${socket.id} join global room`,
    });

    socket.on('Greet', () => {
        socket.emit('Hi', { message: `Hi User with id ${socket.id}`,
        socketId: socket.id });
    });

    socket.on('username', (username) => {
        socket.emit('Greetings with username', {
            message: `Hello ${username}, welcome to the game `
        });
    })

    socket.on("createLeaderBoard", ({player, score}) =>{

        // kita simpan ke db
        leaderBoard.push({ player, score, createdAt: new Date() });

        console.log("Array Leader Board : ", leaderBoard);
        
        // tampilkan leader board ke semua user yang konek
        io.emit("showLeaderBoard:broadcast", leaderBoard);
    })

    socket.on("disconnect", () => {
        console.log('a user disconnected', socket.id);
    });
});

httpServer.listen(port, () => console.log(`Listening to port ${port}`));