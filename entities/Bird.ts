import BirdSprite from "assets/Red_Bird_Sprite.png";
import { BirdConfig, birdCoordinates } from "constants/bird";
import { IPosition } from "types/position";

const STEP = 60;

export class Bird {
  ctx: CanvasRenderingContext2D;
  ready = false;
  bird: HTMLImageElement;
  birdFrameCounter = 0;
  birdPosition: IPosition;
  groundYCoordinate: number;

  constructor(ctx: CanvasRenderingContext2D, groundYCoordinate: number) {
    this.ctx = ctx;
    this.bird = new Image();
    this.bird.src = BirdSprite.src;
    this.groundYCoordinate = groundYCoordinate;
    this.bird.onload = () => {
      this.ready = true;
    };
    this.birdPosition = {
      y: window.innerHeight / 2 - 160,
      x: 40,
    };

    window.addEventListener("keydown", this.onKeydown.bind(this));
  }

  onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        this.moveUp();
        break;
      case "ArrowDown":
        this.moveDown();
        break;
    }
  }

  moveUp() {
    if (this.birdPosition.y - STEP >= -15) {
      this.birdPosition.y -= 60;
    }
  }

  moveDown() {
    if (this.birdPosition.y < this.groundYCoordinate - 3 * STEP) {
      this.birdPosition.y += 60;
    }
  }

  animate(frame: number) {
    if (!this.ready) {
      return;
    }

    this.ctx.drawImage(
      this.bird,
      birdCoordinates[this.birdFrameCounter].x,
      birdCoordinates[this.birdFrameCounter].y,
      birdCoordinates[this.birdFrameCounter].width,
      birdCoordinates[this.birdFrameCounter].height,
      this.birdPosition.x,
      this.birdPosition.y,
      birdCoordinates[this.birdFrameCounter].width,
      birdCoordinates[this.birdFrameCounter].height
    );

    if ((frame + 1) % BirdConfig.UPDATE_ON_FRAME === 0) {
      if (this.birdFrameCounter + 1 === BirdConfig.SPRITES_IN_LINE) {
        this.birdFrameCounter = 0;
      } else {
        this.birdFrameCounter++;
      }
    }
  }
}
