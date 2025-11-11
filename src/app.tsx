import { useReducer } from "react";
import ReactDOM from "react-dom/client";
import { gameReducer, INITIAL_STATE } from "./reducer";
import { GameCanvas, GameTools, useGameLoop, GameInfo, GitHubLink } from "./ui";

function GameOfLife() {
  // poor man's Redux, but our component tree isn't very deep anyway
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  useGameLoop(state, dispatch);

  return (
    <div className="game-container">
      <h1>Game of Life</h1>
      <GameInfo state={state} />
      <GameTools state={state} dispatch={dispatch} />
      <GameCanvas state={state} dispatch={dispatch} />
      <GitHubLink />
    </div>
  );
}

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(<GameOfLife />);
