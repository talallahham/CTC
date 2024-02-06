import React from "react";

import styles from "./Samples.module.css";

import Header from "../Utils/Header/Header";
import SamplesList from "../Utils/List/Samples/SamplesList";

const Samples = (props) => {
  return (
    <>
      <Header />
      <SamplesList admin={props.admin} />
    </>
  );
};

export default Samples;
