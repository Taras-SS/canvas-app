import { createPortal } from "react-dom";
import styles from "components/Modal/Modal.module.scss";
import { MODAL_PORTAL_DOM_ID } from "constants/global";
import { ReactNode, useState, useEffect } from "react";
import classNames from "classnames";

export interface IModal {
  isOpen: boolean;
  children: JSX.Element;
  className?: string;
  overlayClassName?: string;
  header?: ReactNode;
}

const Modal = (props: IModal) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const Component = (
    <>
      <div className={classNames(styles.overlay, props.overlayClassName)} />
      <div className={classNames(styles.modal, props.className)}>
        {props.header ? (
          <h3 className={styles.modal__header}>{props.header}</h3>
        ) : null}
        <div className={styles.modal__body}>{props.children}</div>
      </div>
    </>
  );

  return props.isOpen && mounted
    ? createPortal(
        Component,
        document.getElementById(MODAL_PORTAL_DOM_ID) ||
          document.createElement("div")
      )
    : null;
};

export default Modal;
