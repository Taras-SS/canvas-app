import { Bird } from "entities/Bird";
import PlaneSprite from "assets/plane.png";
import { MovingEntity } from "entities/MovingEntity";
import { IPosition } from "types/position";
import { PlaneConfig, planeFrames } from "constants/plane";
import { birdCoordinates } from "constants/bird";

export class Plane extends MovingEntity {
  ctx: CanvasRenderingContext2D;
  bird: Bird;
  plane: HTMLImageElement;
  frame = 0;
  position: IPosition;
  minYPosition: number;
  onLose: () => void;

  constructor(
    bird: Bird,
    ctx: CanvasRenderingContext2D,
    minYPosition: number,
    onLose: () => void
  ) {
    super();
    this.ctx = ctx;
    this.bird = bird;
    this.plane = new Image();
    this.plane.src = PlaneSprite.src;
    this.minYPosition = minYPosition;
    this.position = this.generatePosition();
    this.onLose = onLose;
  }

  regenerateCrow() {
    this.position = this.generatePosition();
    this.frame = 0;
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
        this.position.x + planeFrames[this.frame].width + this.position.x,
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
      this.isBetween(this.position.y + planeFrames[this.frame].height, {
        min: this.bird.birdPosition.y,
        max:
          this.bird.birdPosition.y +
          birdCoordinates[this.bird.birdFrameCounter].height,
      });

    return matchX && matchY;
  }

  animate(animationFrameNumber: number) {
    if (this.intersectWithBird()) {
      this.onLose();
    }

    if (this.position.x < -100) {
      this.regenerateCrow();
    }

    this.ctx.drawImage(
      this.plane,
      planeFrames[this.frame].x,
      planeFrames[this.frame].y,
      planeFrames[this.frame].width,
      planeFrames[this.frame].height,
      this.position.x,
      this.position.y,
      planeFrames[this.frame].width,
      planeFrames[this.frame].height
    );

    this.position.x -= PlaneConfig.SPEED;

    if ((animationFrameNumber + 1) % PlaneConfig.UPDATE_ON_FRAME === 0) {
      if (this.frame + 1 === PlaneConfig.FRAMES_AMOUNT) {
        this.frame = 0;
      } else {
        this.frame++;
      }
    }
  }
}
