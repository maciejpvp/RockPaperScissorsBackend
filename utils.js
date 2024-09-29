const calcWinner = (player1choice, player2choice) => {
  const choices = ["rock", "paper", "scissors"];

  if (!choices.includes(player1choice) || !choices.includes(player2choice)) {
    return "Invalid choice";
  }

  if (player1choice === player2choice) {
    return "Draw";
  }

  if (
    (player1choice === "rock" && player2choice === "scissors") ||
    (player1choice === "paper" && player2choice === "rock") ||
    (player1choice === "scissors" && player2choice === "paper")
  ) {
    return "player1";
  } else {
    return "player2";
  }
};

module.exports = { calcWinner };
