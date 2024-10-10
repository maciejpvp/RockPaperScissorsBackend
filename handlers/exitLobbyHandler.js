const { rooms } = require("../state");

module.exports = (socket) => {
  socket.on("exit-lobby", ({ room }) => {
    const currentRoom = rooms[room];
    if (!currentRoom) return;

    const player1 = currentRoom.player1.id;
    const player2 = currentRoom.player2.id;
    if (player1 === socket.id) {
      socket.to(player2).emit("opponent-exit-lobby");
    } else if (player2 === socket.id) {
      socket.to(player1).emit("opponent-exit-lobby");
    }

    delete rooms[room]; // Usuwa pokój z arraya
  });
};
