import { getNextGeneration } from "./board";

describe("still life (stays the same forever)", () => {
  test("4x4 block", () => {
    const cells = [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ];
    expect(getNextGeneration(cells)).toEqual(cells);
  });
  test("beehive", () => {
    const cells = [
      [false, false, false, false, false, false],
      [false, false, true, true, false, false],
      [false, true, false, false, true, false],
      [false, false, true, true, false, false],
      [false, false, false, false, false, false],
    ];
    expect(getNextGeneration(cells)).toEqual(cells);
  });
});

describe("oscillating life", () => {
  test("line", () => {
    const stateOne = [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ];
    const stateTwo = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];

    const firstTick = getNextGeneration(stateOne);

    expect(firstTick).toEqual(stateTwo);

    const secondTick = getNextGeneration(firstTick);

    expect(secondTick).toEqual(stateOne);
  });
});
