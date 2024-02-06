import React from "react";
import { isAdmin } from "../../../../global/slices/auth/auth-actions";

import SampleMeasurement from "../../../../components/Samples/Sample/Measurement/SampleMeasurement";
import Header from "../../../../components/Utils/Header/Header";

const SampleMeasurementPage = () => {
  return (
    <>
      <Header />
      <SampleMeasurement />
    </>
  );
};

export default SampleMeasurementPage;
