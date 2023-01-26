import PalmSprite from "assets/palm_1.png";
import { PalmConfig } from "constants/palm";

export class Palm {
  ctx: CanvasRenderingContext2D;
  palm: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.palm = new Image();
    this.palm.src = PalmSprite.src;
  }

  render(config: { x: number; y: number; width?: number; height?: number }) {
    this.ctx.drawImage(
      this.palm,
      0,
      0,
      PalmConfig.PALM_DEFAULT_WIDTH,
      PalmConfig.PALM_DEFAULT_HEIGHT,
      config.x,
      config.y,
      config.width ?? PalmConfig.PALM_DEFAULT_WIDTH,
      config.height ?? PalmConfig.PALM_DEFAULT_HEIGHT
    );
  }
}
