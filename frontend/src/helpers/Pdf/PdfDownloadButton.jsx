import React from "react";

import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfGenerator from "./PdfGenerator";

const PdfDownloadButton = (props) => {
  const onClickFunction = () => {
    setTimeout(() => {
      props.onClick();
    }, 2000);
  };

  return (
    <PDFDownloadLink
      document={<PdfGenerator sample={props.sample} />}
      fileName={props.fileName}
      className={props.className}
      onClick={props.onClick ? onClickFunction : () => {}}
    >
      {({ loading }) => (loading ? "Loading PDF ..." : `${props.btnText}`)}
    </PDFDownloadLink>
  );
};

export default PdfDownloadButton;
