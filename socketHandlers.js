const joinQueueHandler = require("./handlers/joinQueueHandler");
const makeMoveHandler = require("./handlers/makeMoveHandler");
const playAgainHandler = require("./handlers/playAgainHandler");
const exitLobbyHandler = require("./handlers/exitLobbyHandler");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    joinQueueHandler(socket);
    makeMoveHandler(socket);
    playAgainHandler(socket);
    exitLobbyHandler(socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      const { rooms } = require("./state");
      for (const room in rooms) {
        if (rooms[room].player1.id === socket.id) {
          rooms[room].player1.id = null;
        } else if (rooms[room].player2.id === socket.id) {
          rooms[room].player2.id = null;
        }
      }
    });
  });
};
