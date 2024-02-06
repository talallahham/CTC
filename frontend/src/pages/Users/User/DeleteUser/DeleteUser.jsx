import React from "react";

import DeleteUser from "../../../../components/Users/User/DeleteUser/DeleteUser";
import { isAdmin } from "../../../../global/slices/auth/auth-actions";

const DeleteUserPage = () => {
  return (
    <>
      <DeleteUser admin={isAdmin()} />
    </>
  );
};

export default DeleteUserPage;
