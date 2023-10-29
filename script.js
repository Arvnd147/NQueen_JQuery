function isSafe(board, row, col) {
  // Check the row on the left
  for (let i = 0; i < col; i++) {
    if (board[row][i]) {
      return false;
    }
  }

  // Check upper diagonal on the left
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j]) {
      return false;
    }
  }

  // Check lower diagonal on the left
  for (let i = row, j = col; i < board.length && j >= 0; i++, j--) {
    if (board[i][j]) {
      return false;
    }
  }

  return true;
}

function solveNQueens(board, col) {
  if (col >= board.length) {
    return true;
  }

  for (let i = 0; i < board.length; i++) {
    if (isSafe(board, i, col)) {
      board[i][col] = 1;

      if (solveNQueens(board, col + 1)) {
        return true;
      }

      board[i][col] = 0;
    }
  }

  return false;
}

function drawBoard(board) {
  const chessboard = $(".chessboard");

  chessboard.empty(); // Clear the chessboard

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const cell = $('<div class="cell"></div>');
      const cellInner = $('<div class="cell-inner"></div');

      if (board[row][col] === 1) {
        cellInner.html('<div class="queen">&#9819;</div>');
      }

      cell.append(cellInner);
      chessboard.append(cell);
    }
  }
}

function generateBoard() {
  const n = parseInt($("#n").val());
  if (n < 4) {
    alert("Please enter a valid N value (N should be 4 or greater).");
    return;
  }

  const board = Array.from(Array(n), () => Array(n).fill(0));
  if (solveNQueens(board, 0)) {
    document.documentElement.style.setProperty("--n", n);
    drawBoard(board);
  } else {
    alert("No solution found for N-Queens with N=" + n);
  }
}

// Generate the board on page load
window.onload = generateBoard;