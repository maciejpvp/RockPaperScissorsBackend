const { v4: uuidv4 } = require("uuid");
const { rooms, playersWaitingForLobby } = require("../state");

module.exports = (socket) => {
  socket.on("join-queue", () => {
    if (!playersWaitingForLobby.includes(socket.id)) {
      playersWaitingForLobby.push(socket.id);
    }

    if (playersWaitingForLobby.length >= 2) {
      const player1 = playersWaitingForLobby.shift();
      const player2 = playersWaitingForLobby.shift();

      const roomId = uuidv4();

      rooms[roomId] = {
        player1: { id: player1, choice: null },
        player2: { id: player2, choice: null },
      };

      socket.to(player1).emit("lobby-created", { roomId, player1, player2 });
      socket.emit("lobby-created", { roomId });

      console.log(`Created lobby with ID: ${roomId}`);
    }
  });
};
