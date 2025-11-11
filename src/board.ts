export type BoardCell = boolean;
export type BoardRow = BoardCell[];
export type Board = BoardRow[];

export function createEmptyBoard(width: number, height: number): Board {
  return Array(height)
    .fill([])
    .map(() => Array(width).fill(0));
}

export function drawPointInBoard(
  board: Board,
  x: number,
  y: number,
  erase: boolean
): Board {
  const newBoard: Board = [];
  for (let row = 0; row < board.length; row++) {
    newBoard[row] = [];
    for (let col = 0; col < board[row].length; col++) {
      newBoard[row][col] = board[row][col];
    }
  }
  newBoard[y][x] = !erase;
  return newBoard;
}

export function getNextGeneration(board: Board): Board {
  const newBoard: Board = [];
  for (let y = 0; y < board.length; y++) {
    newBoard[y] = [];
    for (let x = 0; x < board[y].length; x++) {
      const wasAlive = board[y][x];
      const liveNeighbourCount = [
        [y - 1, x - 1],
        [y - 1, x],
        [y - 1, x + 1],
        [y, x - 1],
        [y, x + 1],
        [y + 1, x - 1],
        [y + 1, x],
        [y + 1, x + 1],
      ].filter(([ny, nx]) => board?.[ny]?.[nx]).length;
      newBoard[y][x] = wasAlive
        ? liveNeighbourCount === 2 || liveNeighbourCount === 3
        : liveNeighbourCount === 3;
    }
  }
  return newBoard;
}
