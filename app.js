const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const port = 3000
const app = express();



const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(`a user connected with id ${socket.id}`);

});

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});