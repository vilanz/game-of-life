import { useEffect, useRef } from "react";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  CELL_COLORS,
  CELL_SIZE,
  IS_DESKTOP,
} from "../defaults";
import { Board } from "../logic";
import { GameDispatch, GameState } from "../reducer";
import { getReffedValue } from "../utils";

function getOffsetPositionInCanvas(position: number) {
  return Math.floor(position / CELL_SIZE);
}

export function getMouseEventCell(
  clickX: number,
  clickY: number,
  board: Board
) {
  const x = getOffsetPositionInCanvas(clickX);
  const y = getOffsetPositionInCanvas(clickY);
  if (x >= board[0].length || y >= board.length || x < 0 || y < 0) {
    return null;
  }
  return { x, y };
}

export function GameCanvas({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: GameDispatch;
}) {
  const { board, hoverPoint } = state;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(
    function redrawCanvas() {
      const canvas2dCtx = canvasRef.current?.getContext("2d");
      if (!canvas2dCtx) {
        return;
      }
      for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
          const isHovering = hoverPoint
            ? hoverPoint.x === x && hoverPoint.y === y
            : false;
          if (isHovering) {
            canvas2dCtx.fillStyle = CELL_COLORS.Hovering;
          } else {
            const isAlive = board[y][x];
            if (isAlive) {
              canvas2dCtx.fillStyle = CELL_COLORS.Live;
            } else {
              canvas2dCtx.fillStyle =
                (x + y) % 2 !== 0
                  ? CELL_COLORS.DeadZebra
                  : CELL_COLORS.Dead;
            }
          }
          canvas2dCtx.fillRect(
            x * CELL_SIZE,
            y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      }
    },
    [board, hoverPoint]
  );

  // we don't want to reattach the event listeners on the next useEffect on every canvas draw
  // so let's use a ref
  const boardRef = getReffedValue(board);

  // keep drawing when user holds down their click
  const isHoldingClick = useRef(false);

  // if the user draws on an live cell, he will erase when holding down the mouse, and vice versa
  const willBeErasing = useRef(false);

  useEffect(function handleMouseEvents() {
    const canvas2dCtx = canvasRef.current?.getContext("2d");
    if (!canvas2dCtx) {
      return;
    }
    canvasRef.current?.addEventListener("mouseup", () => {
      isHoldingClick.current = !isHoldingClick.current;
    });

    canvasRef.current?.addEventListener("mousedown", (e) => {
      isHoldingClick.current = !isHoldingClick.current;
      const cell = getMouseEventCell(e.offsetX, e.offsetY, boardRef.current);
      if (!cell) {
        return;
      }
      willBeErasing.current = boardRef.current?.[cell.y]?.[cell.x];
      dispatch({
        type: "DRAW_POINT",
        payload: {
          x: cell.x,
          y: cell.y,
          erase: willBeErasing.current,
        },
      });
    });

    canvasRef.current?.addEventListener("mousemove", (e) => {
      const cell = getMouseEventCell(e.offsetX, e.offsetY, boardRef.current);
      if (!cell) {
        return;
      }
      // TODO proper click-and-hold on mobile
      if (IS_DESKTOP) {
        dispatch({
          type: "HOVER_POINT",
          payload: {
            x: cell.x,
            y: cell.y,
          },
        });
      }
      if (isHoldingClick.current) {
        const erase = willBeErasing.current;
        dispatch({
          type: "DRAW_POINT",
          payload: {
            x: cell.x,
            y: cell.y,
            erase,
          },
        });
      }
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={BOARD_WIDTH * CELL_SIZE}
      height={BOARD_HEIGHT * CELL_SIZE}
    />
  );
}
