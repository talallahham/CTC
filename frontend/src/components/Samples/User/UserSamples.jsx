import React from "react";

import styles from "./UserSamples.module.css";
import Header from "../../Utils/Header/Header";
import UserSamplesList from "../../Utils/List/Samples/User/UserSamplesList";

const UserSamples = (props) => {
  return (
    <>
      <Header />
      <UserSamplesList username={props.username} admin={props.admin} />
    </>
  );
};

export default UserSamples;
