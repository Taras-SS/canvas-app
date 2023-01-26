import { IPosition } from "types/position";

export class MovingEntity {
  position?: IPosition;
  minYPosition?: number;

  generatePosition(): IPosition {
    return {
      x: window.innerWidth,
      y: Math.random() * (this.minYPosition || window.innerHeight),
    };
  }

  isBetween(num: number, range: { min: number; max: number }): boolean {
    return num >= range.min && num <= range.max;
  }
}
