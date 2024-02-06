import React from "react";
import Modal from "./Modal";

import styles from "./ModalContent.module.css";

const ModalContent = (props) => {
  return (
    <Modal>
      <div className={styles["modal"]}>
        <section className={`${props.className}`}>{props.children}</section>
        <button className={styles["close-btn"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ModalContent;
