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

const rooms = ["1Vs1", "1VsMany"]

let leaderBoard = [];
let count = 10;
let countdownInterval;

function startCountdown() {
    if (!countdownInterval) {
      countdownInterval = setInterval(() => {
        if (count > 0) {
          count--;
          io.emit('count', count);
        } else {
          clearInterval(countdownInterval);
          countdownInterval = null;
          count = 10;
          io.emit('count', count);
          startCountdown(); // Restart the countdown
        }
      }, 1000);
    }
  }

io.on("connection", (socket) => {
    // ...
    console.log('a user connected', socket.id);

    io.emit("Greetings", {
        message: `User with id ${socket.id} join global room`,
    });


    socket.on('Greet', () => {
        socket.emit('Hi', {
            message: `Hi User with id ${socket.id}`,
            socketId: socket.id
        });
    });

    socket.on('username', (username) => {
        socket.emit('Greetings with username', {
            message: `Hello ${username}, welcome to the game `,
            rooms
        });
    })


    io.emit('count', count);
    
    socket.on('startCountdown', () => {
        if (!countdownInterval) {
            countdownInterval = setInterval(() => {
                if (count > 0) {
                    count--;
                    io.emit('count', count);
                } else {
                    clearInterval(countdownInterval);
                    countdownInterval = null;
                }
            }, 1000);
        }
    });

    if (!countdownInterval) {
        startCountdown();
      }
    


    socket.on("createLeaderBoard", ({ player, score }) => {

        // kita simpan ke db
        leaderBoard.push({ player, score, createdAt: new Date() });

        console.log("Array Leader Board : ", leaderBoard);

        // tampilkan leader board ke semua user yang konek
        io.emit("showLeaderBoard:broadcast", leaderBoard);
    })

});

httpServer.listen(port, () => console.log(`Listening to port ${port}`));