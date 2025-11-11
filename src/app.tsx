import { useReducer } from "react";
import ReactDOM from "react-dom/client";
import { gameReducer, INITIAL_STATE } from "./reducer";
import { GameInfo } from "./game-info";
import { GameTools } from "./game-tools";
import { GameCanvas } from "./canvas";
import { useGameLoop } from "./use-game-loop";

function GameOfLife() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  useGameLoop(state, dispatch);

  return (
    <div className="game-container">
      <h1>Game of Life</h1>
      <GameInfo state={state} />
      <GameTools state={state} dispatch={dispatch} />
      <GameCanvas state={state} dispatch={dispatch} />
    </div>
  );
}

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(<GameOfLife />);
