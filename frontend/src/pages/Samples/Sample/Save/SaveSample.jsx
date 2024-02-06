import React from "react";
import SaveSample from "../../../../components/Samples/Sample/Save/SaveSample";
import { isAdmin } from "../../../../global/slices/auth/auth-actions";

const SaveSamplePage = () => {
  return (
    <>
      <SaveSample admin={isAdmin()} />
    </>
  );
};

export default SaveSamplePage;
