import { IPosition } from "types/position";

export enum PlaneConfig {
  SPEED = 8,
  FRAMES_AMOUNT = 4,
  UPDATE_ON_FRAME = 8,
  WIDTH = 175,
  HEIGHT = 183,
}

export const planeFrames: Array<IPosition & { width: number; height: number }> =
  [
    {
      x: 4,
      y: 0,
      width: PlaneConfig.WIDTH,
      height: PlaneConfig.HEIGHT,
    },
    {
      x: 206,
      y: 0,
      width: PlaneConfig.WIDTH,
      height: PlaneConfig.HEIGHT,
    },
    {
      x: 0,
      y: 198,
      width: PlaneConfig.WIDTH,
      height: PlaneConfig.HEIGHT,
    },
    {
      x: 205,
      y: 198,
      width: PlaneConfig.WIDTH,
      height: PlaneConfig.HEIGHT,
    },
  ];
