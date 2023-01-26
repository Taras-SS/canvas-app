import { IPosition } from "types/position";

export enum BirdConfig {
  SPRITES_IN_LINE = 8,
  //will rerender bird per each 6 frames (10 times per second)
  UPDATE_ON_FRAME = 6,
}

export const birdCoordinates: Array<
  IPosition & {
    height: number;
    width: number;
  }
> = [
  {
    x: 0,
    y: 0,
    height: 154,
    width: 166,
  },
  {
    //previous frame's width + spacing
    x: 166 + 15,
    y: 12,
    height: 140,
    width: 170,
  },
  {
    x: 166 + 15 + 170 + 36,
    y: 42,
    height: 106,
    width: 174,
  },
  {
    x: 166 + 15 + 170 + 36 + 174 + 33,
    y: 42,
    height: 116,
    width: 169,
  },
  {
    x: 166 + 15 + 170 + 36 + 174 + 33 + 169 + 30,
    y: 39,
    height: 158,
    width: 172,
  },
  {
    x: 166 + 15 + 170 + 36 + 174 + 33 + 169 + 30 + 172 + 29,
    y: 39,
    height: 117,
    width: 172,
  },
  {
    x: 166 + 15 + 170 + 36 + 174 + 33 + 169 + 30 + 172 + 29 + 172 + 24,
    y: 36,
    height: 106,
    width: 174,
  },
  {
    x:
      166 +
      15 +
      170 +
      36 +
      174 +
      33 +
      169 +
      30 +
      172 +
      29 +
      172 +
      24 +
      174 +
      32,
    y: 6,
    height: 140,
    width: 168,
  },
];
