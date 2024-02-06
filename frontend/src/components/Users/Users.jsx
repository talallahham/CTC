import React from "react";

import styles from "./Users.module.css";
import Header from "../Utils/Header/Header";
import UsersList from "../Utils/List/Users/UsersList";

const Users = (props) => {
  return (
    <>
      <Header />
      <UsersList admin={props.admin} />
    </>
  );
};

export default Users;
