/**
 * @jest-environment jsdom
 */
import { CELL_SIZE } from "./defaults";
import { createEmptyBoard } from "./board";
import { getMouseEventCell } from "./canvas";

it.each([
  [0, 0, [0, 0]],
  [CELL_SIZE - 3, 0, [0, 0]],
  [CELL_SIZE + 3, CELL_SIZE + 3, [1, 1]],
  [0, CELL_SIZE * 2 + 3, [0, 2]],
])(
  "should return the appropriate cell for a click on %i/%i",
  (x, y, expected) => {
    expect(getMouseEventCell(x, y, createEmptyBoard(100, 100))).toEqual({
      x: expected[0],
      y: expected[1],
    });
  }
);

it.each([
  [CELL_SIZE * 3, CELL_SIZE * 3],
  [0, CELL_SIZE * 3],
  [CELL_SIZE * 3, CELL_SIZE * 2],
])("should ignore events outside the board", (x, y) => {
  const board = createEmptyBoard(2, 2);
  expect(getMouseEventCell(x, y, board)).toBeNull();
});
