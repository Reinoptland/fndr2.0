import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import styles from "./ModalFilterOptions.module.css";
import { useModal } from "../../../../Context/ModalProvider/ModalProvider";
import { RadioCheckbox } from "../../../atoms";

const ModalFilterOptions = ({ children, ...props }) => {
  const isOpen = useModal().isOpen;
  const toggle = useModal().toggleModal;
  if (isOpen) {
    return ReactDom.createPortal(
      <>
        <div className={styles.outerDiv} />
        <div className={styles.innerDiv}>
          <div className={styles.closeModal} onClick={toggle}>
            X
          </div>
          <div>{children}</div>
        </div>
      </>,
      document.getElementById("portal")
    );
  }
};
ModalFilterOptions.propTypes = {};

export default ModalFilterOptions;
