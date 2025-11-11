import { IS_DESKTOP } from "./defaults";
import { GameState } from "./reducer";

export function GameInfo({ state }: { state: GameState }) {
  const { generation, isRunning } = state;

  return (
    <div className="game-info">
      <div>
        <p>Draw cells by dragging and holding inside the canvas.</p>
        <p>Press "Run" to run the Game of Life simulation at any time, including while it's running :)</p>
      </div>
      <div>Generation: {generation} {!isRunning && '(paused)'}</div>
    </div>
  );
}
