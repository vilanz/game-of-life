import { useEffect, useRef } from "react";
import { GameDispatch, GameState } from "./reducer";
import { useDebouncedValue } from "./utils";

export const useGameLoop = (state: GameState, dispatch: GameDispatch) => {
  const { currentSpeed, isRunning } = state;
  const debouncedSpeed = useDebouncedValue(currentSpeed, 300);

  const animationFrameRef = useRef<number | null>(null);
  useEffect(
    function startTicking() {
      if (!state.isRunning) {
        return;
      }
      let currentTime: number = 0;
      function gameLoop(time: number) {
        const delta = time - currentTime;
        const updateAtXMs = 1000 * ((100 - debouncedSpeed) / 100);
        if (debouncedSpeed > 0 && delta >= updateAtXMs) {
          currentTime = time;
          dispatch({
            type: "UPDATE_BOARD",
          });
        }
        if (animationFrameRef.current !== null) {
          animationFrameRef.current = requestAnimationFrame(gameLoop);
        }
      }
      animationFrameRef.current = requestAnimationFrame(gameLoop);

      return function () {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current!);
          animationFrameRef.current = null;
        }
      };
    },
    [debouncedSpeed, isRunning]
  );
};
