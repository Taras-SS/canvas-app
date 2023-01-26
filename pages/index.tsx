import { useRef, useState } from "react";
import { PalmConfig } from "constants/palm";
import styles from "styles/Home.module.scss";
import { useOnWindowLoad } from "hooks/useOnWindowLoad";
import { Bird } from "entities/Bird";
import { Palm } from "entities/Palm";
import { Coin } from "entities/Coin";
import { Crow } from "entities/Crow";
import { Plane } from "entities/Plane";
import { HEIGHT as COIN_HEIGHT } from "constants/coin";
import { PlaneConfig } from "constants/plane";
import Modal from "components/Modal";
import Button from "components/Button";
import { ButtonVariant } from "components/Button/Button";
import {
  renderSky,
  renderGround,
  renderPyramid,
  renderSun,
} from "taras-canvas-utils";

const Home = () => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [score, setScore] = useState<number>(0);
  const frameNumber = useRef<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const continueAnimation = useRef<boolean>(true);

  useOnWindowLoad(() => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });

    if (!canvasRef.current || isModalOpen) {
      continueAnimation.current = false;
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      return;
    }

    const bird = new Bird(ctx, window.innerHeight - 200);
    const palm = new Palm(ctx);
    const coin = new Coin(
      ctx,
      bird,
      onCoinCollect,
      window.innerHeight - 200 - COIN_HEIGHT
    );
    const crow = new Crow(bird, ctx, window.innerHeight - 200);
    const plane = new Plane(
      bird,
      ctx,
      window.innerHeight - 200 - PlaneConfig.HEIGHT,
      onLose
    );
    renderScene(ctx, bird, palm, coin, crow, plane);
  }, [isModalOpen]);

  const animate = (
    ctx: CanvasRenderingContext2D,
    bird: Bird,
    palm: Palm,
    coin: Coin,
    crow: Crow,
    plane: Plane
  ) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    renderSky(ctx, window.innerWidth, window.innerHeight);
    renderSun(ctx, { radius: 100, x: window.innerWidth / 2, y: 140 });
    renderGround(ctx, {
      width: window.innerWidth,
      height: 200,
      y: window.innerHeight - 200,
      x: 0,
    });
    renderPyramid(ctx, {
      x: window.innerWidth - 800,
      yBottom: window.innerHeight - 200,
      yTop: window.innerHeight - 400,
    });

    bird.animate(frameNumber.current);
    palm.render({
      x: window.innerWidth - 200,
      y: window.innerHeight - 200 - PalmConfig.PALM_DEFAULT_HEIGHT + 5,
      width: PalmConfig.PALM_DEFAULT_WIDTH * 1.2,
      height: PalmConfig.PALM_DEFAULT_HEIGHT * 1.2,
    });
    palm.render({
      x: 400,
      y: window.innerHeight - 200 - PalmConfig.PALM_DEFAULT_HEIGHT + 5,
      width: PalmConfig.PALM_DEFAULT_WIDTH * 1.15,
      height: PalmConfig.PALM_DEFAULT_HEIGHT * 1.15,
    });
    palm.render({
      x: 330,
      y: window.innerHeight - 200 - PalmConfig.PALM_DEFAULT_HEIGHT + 20,
    });
    palm.render({
      x: 800,
      y: window.innerHeight - 200,
      height: PalmConfig.PALM_DEFAULT_HEIGHT * 1.5,
      width: PalmConfig.PALM_DEFAULT_WIDTH * 1.5,
    });
    palm.render({
      x: 900,
      y: window.innerHeight - 250,
    });
    frameNumber.current++;

    coin.animate(frameNumber.current);
    plane.animate(frameNumber.current);
    //crow.animate(frameNumber.current);
  };

  const renderScene = (
    ctx: CanvasRenderingContext2D,
    bird: Bird,
    palm: Palm,
    coin: Coin,
    crow: Crow,
    plane: Plane
  ) => {
    if (!continueAnimation.current) {
      return;
    }

    animate(ctx, bird, palm, coin, crow, plane);
    requestAnimationFrame(() =>
      renderScene(ctx, bird, palm, coin, crow, plane)
    );
  };

  const onCoinCollect = () => {
    setScore((prevValue) => prevValue + 1);
  };

  const startNewGame = () => {
    setIsModalOpen(false);
    continueAnimation.current = true;
    setScore(0);
  };

  const onLose = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <canvas
          ref={canvasRef}
          className={styles.container__canvas}
          width={screenSize.width}
          height={screenSize.height}
        />
        <div className={styles.container__score}>Score: {score}</div>
      </div>
      <Modal
        isOpen={isModalOpen}
        header="Please, try again"
        className={styles.modal}
      >
        <div className={styles.modal__body}>
          <h5 className={styles.modal__result}>Result - {score} Coins</h5>
          <div className={styles["modal__buttons-container"]}>
            <Button
              className={styles.modal__button}
              variant={ButtonVariant.Outlined}
              onClick={startNewGame}
            >
              Try once again
            </Button>
            <Button
              className={styles.modal__button}
              variant={ButtonVariant.Contained}
              onClick={() => window.close()}
            >
              Exit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
