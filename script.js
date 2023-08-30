document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const status = document.querySelector(".game--status");
    const restartButton = document.querySelector(".game--restart");
  
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
  
    // Function to check if there is a winner or a draw
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
  
      return gameBoard.includes("") ? null : "Draw";
    }
  
    // Function to handle cell click
    function handleCellClick(index) {
      if (!gameBoard[index]) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
  
        const winner = checkWinner();
  
        if (winner) {
          if (winner === "Draw") {
            status.textContent = "It's a draw!";
          } else {
            status.textContent = `${winner} wins!`;
          }
          cells.forEach((cell) => (cell.style.pointerEvents = "none")); // Disable further clicks after game over
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          status.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    }
  
    // Function to reset the game
    function restartGame() {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.style.pointerEvents = "auto"; // Re-enable cell clicks after game restart
      });
      status.textContent = "Player X's turn";
    }
  
    // Event listener for cell clicks
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handleCellClick(index));
    });
  
    // Event listener for restart button
    restartButton.addEventListener("click", restartGame);
  });
  