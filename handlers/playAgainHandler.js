const { rooms } = require("../state");

module.exports = (socket) => {
  socket.on("play-again", ({ room }) => {
    if (!room) return;
    const currentRoom = rooms[room];
    if (!currentRoom) return;
    currentRoom.player1.choice = null;
    currentRoom.player2.choice = null;
    const player1 = currentRoom.player1.id;
    const player2 = currentRoom.player2.id;
    if (player1 === socket.id) {
      currentRoom.playAgain = "player1";
      socket.to(player2).emit("play-again-request");
    } else if (player2 === socket.id) {
      currentRoom.playAgain = "player2";
      socket.to(player1).emit("play-again-request");
    }
  });

  socket.on("accept-play-again-request", ({ room }) => {
    if (!room) return;
    const currentRoom = rooms[room];
    if (!currentRoom) return;
    const player1 = currentRoom.player1.id;
    const player2 = currentRoom.player2.id;
    console.log(currentRoom.playAgain);

    if (player1 === socket.id && currentRoom.playAgain === "player2") {
      socket.emit("play-again-accepted");
      socket.to(player2).emit("play-again-accepted");
    } else if (player2 === socket.id && currentRoom.playAgain === "player1") {
      socket.emit("play-again-accepted");
      socket.to(player1).emit("play-again-accepted");
    }
  });
  socket.on("reject-play-again-request", ({ room }) => {
    if (!room) return;
    const currentRoom = rooms[room];
    if (!currentRoom) return;
    const player1 = currentRoom.player1.id;
    const player2 = currentRoom.player2.id;

    if (player1 === socket.id) {
      socket.to(player2).emit("play-again-rejected");
    } else if (player2 === socket.id) {
      socket.to(player1).emit("play-again-rejected");
    }
    delete rooms[room];
  });
};
