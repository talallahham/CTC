import React from "react";
import AddUser from "../../../../components/Users/User/AddUser/AddUser";
import { isAdmin } from "../../../../global/slices/auth/auth-actions";

const AddUserPage = () => {
  return (
    <>
      <AddUser admin={isAdmin()} />
    </>
  );
};

export default AddUserPage;
