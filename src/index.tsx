import ReactDOM from 'react-dom/client';
import { GameCanvas } from './canvas';
import { MAX_SPEED, MIN_SPEED, useGame } from './use-game';
import './index.css';

function GameOfLife() {
  const {
    board,
    generation,
    currentSpeed,
    speedPercentage,
    resetBoard,
    setSpeed,
  } = useGame();

  return (
    <div className="game-container">
      <h2>Game of Life</h2>
      <p>
        Generation:
        {' '}
        {generation}
      </p>
      <GameCanvas board={board} />
      <div className="game-tools">
        Speed
        <input
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          value={currentSpeed}
          onChange={(e) => setSpeed(+e.target.value)}
        />
        <span className="game-speed">{speedPercentage}</span>
        <button type="button" onClick={resetBoard}>Reset</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root')!;
ReactDOM
  .createRoot(rootElement)
  .render(<GameOfLife />);