import { IPosition } from "types/position";

export enum CrowConfig {
  SPRITES_IN_LINE = 4,
  UPDATE_ON_FRAME = 12,
}

export const crowFrames: Array<IPosition & { width: number; height: number }> =
  [
    {
      x: 0,
      y: 0,
      width: 96,
      height: 53,
    },
    {
      x: 124,
      y: 17,
      width: 98,
      height: 42,
    },
    {
      x: 248,
      y: 18,
      width: 97,
      height: 42,
    },
    {
      x: 373,
      y: 17,
      width: 98,
      height: 42,
    },
  ];
