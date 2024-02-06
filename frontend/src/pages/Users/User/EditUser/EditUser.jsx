import React from "react";
import EditUser from "../../../../components/Users/User/EditUser/EditUser";
import { isAdmin } from "../../../../global/slices/auth/auth-actions";

const EditUserPage = () => {
  return (
    <>
      <EditUser admin={isAdmin()} />
    </>
  );
};

export default EditUserPage;
