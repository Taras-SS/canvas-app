import React, { ReactNode } from "react";
import styles from "components/Button/Button.module.scss";
import classNames from "classnames";

export enum ButtonVariant {
  Outlined = "outlined",
  Contained = "contained",
}

export interface IButtonProps {
  variant: ButtonVariant;
  children: ReactNode;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

const Button = (props: IButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={classNames(styles.button, props.className, {
        [styles.button_outlined]: props.variant === ButtonVariant.Outlined,
        [styles.button_contained]: props.variant === ButtonVariant.Contained,
      })}
    >
      {props.children}
    </button>
  );
};

export default Button;
