import React from "react";
import { useParams } from "react-router-dom";
import UserSamples from "../../../components/Samples/User/UserSamples";
import { isAdmin } from "../../../global/slices/auth/auth-actions";

const UserSamplesPage = () => {
  const { id } = useParams();
  // const username = `${id.charAt(0)}?${id.substring(2)}`;

  return (
    <>
      <UserSamples admin={isAdmin()} username={id} />
    </>
  );
};

export default UserSamplesPage;
