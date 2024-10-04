const { rooms } = require("../state");
const { calcWinner } = require("../utils");

const bothPlayed = (player1Choice, player2Choice) => {
  console.log({ player1Choice }, { player2Choice });
  const winner = calcWinner(player1Choice, player2Choice);

  console.log(winner);
};

const emitResults = (socket, player, oppMove, result) => {
  socket.emit("results", {
    message: result,
    oppMove: oppMove,
  });
  socket.to(player).emit("results", {
    message: result === "You Won" ? "You Lose" : "You Won",
    oppMove: oppMove,
  });
};

module.exports = (socket) => {
  socket.on("make-move", ({ choice, room }) => {
    const currentRoom = rooms[room];
    if (!currentRoom) return;

    const player1 = currentRoom.player1.id;
    const player1Choice = currentRoom.player1.choice;

    const player2 = currentRoom.player2.id;
    const player2Choice = currentRoom.player2.choice;

    if (player1 === socket.id) {
      currentRoom.player1.choice = choice;
      if (player2Choice) {
        const winner = calcWinner(choice, player2Choice);
        if (winner === "player1") {
          socket.emit("results", {
            message: "You Won",
            oppMove: player2Choice,
          });
          socket.to(player2).emit("results", {
            message: "You Lose",
            oppMove: choice,
          });
        } else {
          socket.emit("results", {
            message: "You Lose",
            oppMove: player2Choice,
          });
          socket.to(player2).emit("results", {
            message: "You Won",
            oppMove: choice,
          });
        }
      }
    } else if (player2 === socket.id) {
      currentRoom.player2.choice = choice;
      if (player1Choice) {
        const winner = calcWinner(choice, player2Choice);
        if (winner === "player2") {
          socket.emit("results", {
            message: "You Won",
            oppMove: player1Choice,
          });
          socket.to(player1).emit("results", {
            message: "You Lose",
            oppMove: choice,
          });
        } else {
          socket.emit("results", {
            message: "You Lose",
            oppMove: player1Choice,
          });
          socket.to(player1).emit("results", {
            message: "You Won",
            oppMove: choice,
          });
        }
      }
    } else {
      console.log("Invalid Room");
    }
  });
};
