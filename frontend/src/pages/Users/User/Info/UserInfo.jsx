import React from "react";

import UserInfo from "../../../../components/Users/User/Info/UserInfo";
import { useParams } from "react-router-dom";
import { isAdmin } from "../../../../global/slices/auth/auth-actions";

const UserInfoPage = () => {
  const { id } = useParams();

  return (
    <>
      <UserInfo admin={isAdmin()} username={id} />
    </>
  );
};

export default UserInfoPage;
