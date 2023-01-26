import { IPosition } from "types/position";

export const HEIGHT = 111;

export enum CoinConfig {
  SPRITES_IN_LINE = 7,
  //will rerender bird per each 6 frames (10 times per second)
  UPDATE_ON_FRAME = 6,
}

interface ICoinCoordinates extends IPosition {
  height: number;
  width: number;
}

export const coinCoordinates: ICoinCoordinates[] = [
  {
    x: 1,
    y: 0,
    height: HEIGHT,
    width: 110,
  },
  {
    x: 136,
    y: 0,
    height: HEIGHT,
    width: 96,
  },
  {
    x: 258,
    y: 0,
    height: HEIGHT,
    width: 70,
  },
  {
    x: 352,
    y: 0,
    height: HEIGHT,
    width: 22,
  },
  {
    x: 400,
    y: 0,
    height: HEIGHT,
    width: 70,
  },
  {
    x: 497,
    y: 0,
    height: HEIGHT,
    width: 98,
  },
  {
    x: 618,
    y: 0,
    height: HEIGHT,
    width: 112,
  },
];
