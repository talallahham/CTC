import React from "react";
import ModalContent from "../ModalContent";
import {
  getAuthName,
  getAuthUsername,
  logout,
} from "../../../../global/slices/auth/auth-actions";
import { useNavigate } from "react-router-dom";

import styles from "./UserModal.module.css";

const UserModal = (props) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/auth");
  };

  return (
    <ModalContent onClose={props.onClose} className="flex-col-card">
      <div className="info">
        <div className="label">USERNAME</div>
        <div className="value">{getAuthUsername()}</div>
      </div>
      <div className="info">
        <div className="label">NAME</div>
        <div className="value">{getAuthName()}</div>
      </div>

      <div className="flex-row-card">
        <button className="careful-btn btn" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </ModalContent>
  );
};

export default UserModal;
