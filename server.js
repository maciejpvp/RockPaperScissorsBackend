const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const socketHandlers = require("./socketHandlers");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

socketHandlers(io);

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
