import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

import centerLogo from "../../../assets/header/logo/center-logo.png";
import userIcon from "../../../assets/header/user/user-icon.png";

import UserModal from "../Modal/UserModal/UserModal";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const Header = () => {
  const naviagate = useNavigate();

  const [userModal, setUserModal] = useState(false);

  const navigateToHome = () => {
    naviagate("/");
  };

  const openUserModal = () => {
    setUserModal(true);
  };

  const closeUserModal = () => {
    setUserModal(false);
  };

  let modal = <UserModal onClose={closeUserModal} />;

  return (
    <>
      {userModal && modal}
      <section className={styles["header"]}>
        <img
          src={centerLogo}
          alt="CENTER_LOGO"
          className={styles["center-logo"]}
          onClick={navigateToHome}
        />
        <img
          src={userIcon}
          alt="USER_ICON"
          className={styles["user-icon"]}
          onClick={openUserModal}
        />
      </section>

      <Breadcrumbs />
    </>
  );
};

export default Header;
