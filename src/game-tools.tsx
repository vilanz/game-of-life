import { MAX_SPEED, MIN_SPEED } from "./defaults";
import { GameDispatch, GameState } from "./reducer";

export function GameTools({
  state,
  dispatch,
}: {
  state: GameState;
  dispatch: GameDispatch;
}) {
  const { isRunning, currentSpeed } = state;
  const speedPercentage = Math.round((currentSpeed / MAX_SPEED) * 100);

  return (
    <div className="game-tools">
      <button
        type="button"
        className="start"
        onClick={() => {
          dispatch({
            type: "TOGGLE_RUNNING",
          });
        }}
      >
        {isRunning ? "Stop" : "Run"}
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: "RESET_BOARD" });
        }}
      >
        Reset
      </button>
      <div className="game-speed-controls">
        Speed
        <input
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          value={currentSpeed}
          onChange={(e) =>
            dispatch({
              type: "SET_SPEED",
              payload: +e.target.value,
            })
          }
        />
        <span className="game-speed">{speedPercentage}</span>
      </div>
      <a
        className="github"
        href="https://github.com/vilanz/game-of-life"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/github.png" height={20} alt="GitHub" />
      </a>
    </div>
  );
}
