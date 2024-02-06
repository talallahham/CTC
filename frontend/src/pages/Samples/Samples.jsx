import React from "react";
import SamplesList from "../../components/Utils/List/Samples/SamplesList";

import Samples from "../../components/Samples/Samples";
import { isAdmin } from "../../global/slices/auth/auth-actions";

const SamplesPage = () => {
  return (
    <>
      <Samples admin={isAdmin()} />
    </>
  );
};

export default SamplesPage;
