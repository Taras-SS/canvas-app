import CoinSprite from "assets/coin.png";
import {
  coinCoordinates,
  CoinConfig,
  HEIGHT as COIN_HEIGHT,
} from "constants/coin";
import { IPosition } from "types/position";
import { Bird } from "entities/Bird";
import { birdCoordinates } from "constants/bird";
import { MovingEntity } from "entities/MovingEntity";

const SPEED = 3;

export class Coin extends MovingEntity {
  ctx: CanvasRenderingContext2D;
  coin: HTMLImageElement;
  coinFrame = 0;
  position: IPosition;
  minYPosition: number;
  bird: Bird;
  onCoinCollect: () => void;

  constructor(
    ctx: CanvasRenderingContext2D,
    bird: Bird,
    onCoinCollect: () => void,
    minYPosition: number
  ) {
    super();
    this.ctx = ctx;
    this.coin = new Image();
    this.coin.src = CoinSprite.src;
    this.minYPosition = minYPosition;
    this.position = this.generatePosition();
    this.bird = bird;
    this.onCoinCollect = onCoinCollect;
  }

  regenerateCoin() {
    this.coinFrame = 0;
    this.position = this.generatePosition();
  }

  canPickUpCoin(): boolean {
    const matchX =
      this.isBetween(this.position.x, {
        min: this.bird.birdPosition.x,
        max:
          this.bird.birdPosition.x +
          birdCoordinates[this.bird.birdFrameCounter].width,
      }) ||
      this.isBetween(
        this.position.x +
          coinCoordinates[this.coinFrame].width +
          this.position.x,
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
      this.isBetween(this.position.y + COIN_HEIGHT, {
        min: this.bird.birdPosition.y,
        max:
          this.bird.birdPosition.y +
          birdCoordinates[this.bird.birdFrameCounter].height,
      });

    return matchX && matchY;
  }

  animate(frame: number) {
    if (this.canPickUpCoin()) {
      this.onCoinCollect();
      this.regenerateCoin();
    }

    if (this.position.x < -112) {
      this.regenerateCoin();
    }

    this.ctx.drawImage(
      this.coin,
      coinCoordinates[this.coinFrame].x,
      coinCoordinates[this.coinFrame].y,
      coinCoordinates[this.coinFrame].width,
      coinCoordinates[this.coinFrame].height,
      this.position.x,
      this.position.y,
      coinCoordinates[this.coinFrame].width,
      coinCoordinates[this.coinFrame].height
    );

    this.position.x -= SPEED;

    if ((frame + 1) % CoinConfig.UPDATE_ON_FRAME === 0) {
      if (this.coinFrame + 1 === CoinConfig.SPRITES_IN_LINE) {
        this.coinFrame = 0;
      } else {
        this.coinFrame++;
      }
    }
  }
}
