export const DEFAULT_SPEED = 72;
export const MIN_SPEED = 0;
export const MAX_SPEED = 80;

export const IS_DESKTOP = window.innerWidth >= 768;

export const BOARD_WIDTH = IS_DESKTOP ? 100 : 20;
export const BOARD_HEIGHT = IS_DESKTOP ? 50 : 30;
export const CELL_SIZE = IS_DESKTOP ? 10 : 15;

export enum CELL_COLORS {
  Live = "white",
  Dead = "black",
  DeadZebra = "rgb(7, 7, 7)",
  Hovering = "salmon",
}
