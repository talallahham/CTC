import React from "react";
import Home from "../../components/Home/Home";
import { isAdmin } from "../../global/slices/auth/auth-actions";

const HomePage = () => {
  return (
    <>
      <Home admin={isAdmin()} />
    </>
  );
};

export default HomePage;
