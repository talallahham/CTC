import React from "react";

import styles from "./MessageModal.module.css";
import ModalContent from "../ModalContent";

import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDownloadButton from "../../../../helpers/Pdf/PdfDownloadButton";

const MessageModal = (props) => {
  let fileName = "";
  if (props.sample) {
    fileName = `${props.sample.patient.username}?${props.sample.test.id}.pdf`;
  }

  return (
    <ModalContent onClose={props.onClose} className="flex-col-card">
      <h1 className="header">{props.header}</h1>
      {props.img && <img src={props.img} className={styles["img"]} />}
      <p className="desc">{props.desc}</p>
      {props.submitMessage && (
        <button
          style={{ marginTop: "3vw" }}
          className="btn"
          onClick={props.onClick}
        >
          {props.btnText}
        </button>
      )}
      {props.pdf && (
        <PdfDownloadButton
          className="btn ok-btn"
          sample={props.sample}
          fileName={fileName}
          onClick={props.onClick}
          btnText={props.btnText}
        />
      )}
    </ModalContent>
  );
};

export default MessageModal;
