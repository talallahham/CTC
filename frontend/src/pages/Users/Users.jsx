import React from "react";
import Users from "../../components/Users/Users";
import { isAdmin } from "../../global/slices/auth/auth-actions";

const UsersPage = () => {
  return (
    <>
      <Users admin={isAdmin()} />
    </>
  );
};

export default UsersPage;
