import React from "react";

import styles from "./ListItem.module.css";
import { useNavigate } from "react-router-dom";

const ListItem = (props) => {
  const navigate = useNavigate();
  const { user, sample, active } = props;

  const navigateToUserInfoPage = () => {
    props.onClose();

    const { username } = user;
    navigate(`/users/user/${username}`);
  };

  const navigateToUserSamplesPage = () => {
    props.onClose();

    const { username } = user;
    navigate(`/samples/user/${username}`);
  };

  const navigateToSampleInfoPage = () => {
    props.onClose();
    navigate(`/samples/sample/${sample.serialNumber}`);
  };

  let content = (
    <>
      <div className={styles["list-info"]}>
        <p className={styles["list-header"]}>
          {user ? `USERNAME` : `SERIAL NUMBER`}
        </p>
        <p className={styles["list-value"]}>
          {user ? user.username : sample.serialNumber}
        </p>
      </div>

      <div className={styles["list-info"]}>
        <p className={styles["list-header"]}>{user ? `NAME` : `TEST ID`}</p>
        <p className={styles["list-value"]}>{user ? user.name : sample.test}</p>
      </div>

      <div className={styles["list-info"]}>
        {user && (
          <>
            <p className={styles["list-header"]}>PHONE NUMBER</p>
            <p className={styles["list-value"]}>{user.phone}</p>
          </>
        )}
        {sample && (
          <div className={styles["list-info"]}>
            <p className={styles["list-header"]}>Issued at date</p>
            <p className={styles["list-value"]}>
              {sample.issuedAt.split("T")[0]}
            </p>

            <p className={styles["list-header"]}>Issued at time</p>
            <p className={styles["list-value"]}>
              {sample.issuedAt.split("T")[1].split(".")[0]}
            </p>
          </div>
        )}
      </div>
    </>
  );

  if (active) {
    content = user ? (
      <>
        <div className={styles["btns"]}>
          <button className={styles["btn"]} onClick={navigateToUserInfoPage}>
            Show {user.name} info
          </button>
          <button className={styles["btn"]} onClick={navigateToUserSamplesPage}>
            Show {user.name} samples
          </button>
          <button className={styles["cancel-btn"]} onClick={props.onClose}>
            X
          </button>
        </div>
      </>
    ) : (
      <>
        <div className={styles["btns"]}>
          <button
            className={styles["btn"]}
            onClick={navigateToSampleInfoPage}
            style={{ width: "100%" }}
          >
            Show sample "{sample.serialNumber}" info
          </button>
          <button className={styles["cancel-btn"]} onClick={props.onClose}>
            X
          </button>
        </div>
      </>
    );
  }

  return (
    <li
      className={props.className}
      key={props.keyy}
      onClick={active ? () => {} : props.onClick}
    >
      {content}
    </li>
  );
};

export default ListItem;
