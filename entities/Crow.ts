import CrowSprite from "assets/crow.png";
import { CrowConfig, crowFrames } from "constants/crow";
import { IPosition } from "types/position";
import { MovingEntity } from "entities/MovingEntity";
import { Bird } from "entities/Bird";
import { birdCoordinates } from "constants/bird";

const SPEED = 4.5;

export class Crow extends MovingEntity {
  ctx: CanvasRenderingContext2D;
  crow: HTMLImageElement;
  frame = 0;
  position: IPosition;
  minYPosition: number;
  bird: Bird;

  constructor(bird: Bird, ctx: CanvasRenderingContext2D, minYPosition: number) {
    super();
    this.bird = bird;
    this.ctx = ctx;
    this.crow = new Image();
    this.crow.src = CrowSprite.src;
    this.minYPosition = minYPosition;
    this.position = this.generatePosition();
  }

  intersectWithBird(): boolean {
    const matchX =
      this.isBetween(this.position.x, {
        min: this.bird.birdPosition.x,
        max:
          this.bird.birdPosition.x +
          birdCoordinates[this.bird.birdFrameCounter].width,
      }) ||
      this.isBetween(
        this.position.x + crowFrames[this.frame].width + this.position.x,
        {
          min: this.bird.birdPosition.x,
          max:
            this.bird.birdPosition.x +
            birdCoordinates[this.bird.birdFrameCounter].width,
        }
      );

    const matchY =
      this.isBetween(this.position.y, {
        min: this.bird.birdPosition.y,
        max:
          this.bird.birdPosition.y +
          birdCoordinates[this.bird.birdFrameCounter].height,
      }) ||
      this.isBetween(this.position.y + crowFrames[this.frame].height, {
        min: this.bird.birdPosition.y,
        max:
          this.bird.birdPosition.y +
          birdCoordinates[this.bird.birdFrameCounter].height,
      });

    return matchX && matchY;
  }

  regenerateCrow() {
    this.position = this.generatePosition();
    this.frame = 0;
  }

  animate(animationFrameNumber: number) {
    if (this.intersectWithBird()) {
      // this.onCoinCollect();
      //Remove regenerate method call
      this.regenerateCrow();
    }

    if (this.position.x < -100) {
      this.regenerateCrow();
    }

    this.ctx.drawImage(
      this.crow,
      crowFrames[this.frame].x,
      crowFrames[this.frame].y,
      crowFrames[this.frame].width,
      crowFrames[this.frame].height,
      this.position.x,
      this.position.y,
      crowFrames[this.frame].width,
      crowFrames[this.frame].height
    );

    this.position.x -= SPEED;

    if ((animationFrameNumber + 1) % CrowConfig.UPDATE_ON_FRAME === 0) {
      if (this.frame + 1 === CrowConfig.SPRITES_IN_LINE) {
        this.frame = 0;
      } else {
        this.frame++;
      }
    }
  }
}
