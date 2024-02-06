import React from "react";
import { useParams } from "react-router-dom";
import SampleInfo from "../../../../components/Samples/Sample/Info/SampleInfo";
import { isAdmin } from "../../../../global/slices/auth/auth-actions";

const SampleInfoPage = () => {
  const { id } = useParams();

  return (
    <>
      <SampleInfo serialNumber={id} admin={isAdmin()} />
    </>
  );
};

export default SampleInfoPage;
