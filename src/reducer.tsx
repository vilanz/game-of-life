import { Dispatch } from "react";
import { BOARD_HEIGHT, BOARD_WIDTH, DEFAULT_SPEED } from "./defaults";
import {
  Board,
  drawPointInBoard,
  createEmptyBoard,
  getNextGeneration,
} from "./board";

export interface GameState {
  board: Board;
  generation: number;
  currentSpeed: number;
  hoverPoint: null | { x: number; y: number };
  isRunning: boolean;
  userHasStarted: boolean;
}
export const INITIAL_STATE: GameState = {
  board: createEmptyBoard(BOARD_WIDTH, BOARD_HEIGHT),
  generation: 0,
  currentSpeed: DEFAULT_SPEED,
  hoverPoint: null,
  isRunning: false,
  userHasStarted: false,
};

export type GameAction =
  | { type: "UPDATE_BOARD" }
  | { type: "RESET_BOARD" }
  | { type: "TOGGLE_RUNNING" }
  | { type: "SET_SPEED"; payload: number }
  | { type: "HOVER_POINT"; payload: { x: number; y: number } }
  | { type: "DRAW_POINT"; payload: { x: number; y: number; erase: boolean } };
export type GameDispatch = Dispatch<GameAction>;

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "UPDATE_BOARD":
      return {
        ...state,
        board: getNextGeneration(state.board),
        generation: state.generation + 1,
      };
    case "RESET_BOARD":
      return {
        ...INITIAL_STATE,
        userHasStarted: state.userHasStarted,
      };
    case "SET_SPEED":
      return {
        ...state,
        currentSpeed: action.payload,
      };
    case "TOGGLE_RUNNING":
      return {
        ...state,
        isRunning: !state.isRunning,
        userHasStarted: true,
      };
    case "HOVER_POINT":
      return { ...state, hoverPoint: action.payload };
    case "DRAW_POINT":
      return {
        ...state,
        board: drawPointInBoard(
          state.board,
          action.payload.x,
          action.payload.y,
          action.payload.erase
        ),
      };
  }
}
