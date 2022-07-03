import React, { useLayoutEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { GameRow } from './board';
import {
  getEmptyBoard, randomizeRow, Board, updateCellBoard,
} from './game-logic';

const BOARD_SIZE = 300;
const UPDATE_EVERY_X_MS = 1000 / 5;

export function Game() {
  const useEffectCalled = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const [board, setBoard] = useState<Board>(
    () => getEmptyBoard(BOARD_SIZE).map(randomizeRow),
  );

  useLayoutEffect(() => {
    if (useEffectCalled.current === true) {
      return () => {};
    }
    useEffectCalled.current = true;

    let currentTime: number = 0;
    function gameLoop(time: number) {
      const delta = time - currentTime;
      if (delta >= UPDATE_EVERY_X_MS) {
        setBoard((b) => updateCellBoard(b));
        currentTime = time;
      }
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current !== null) {
        animationFrameRef.current = null;
        cancelAnimationFrame(animationFrameRef.current!);
      }
    };
  }, []);

  return (
    <TransformWrapper>
      <TransformComponent>
        <div>
          {board.map((row, idx) => (
            // Row indexes are stable
            // eslint-disable-next-line react/no-array-index-key
            <GameRow row={row} key={idx} />
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
