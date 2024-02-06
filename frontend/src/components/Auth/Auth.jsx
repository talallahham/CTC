import React, { useRef, useState } from "react";

import styles from "./Auth.module.css";
import Password from "../Utils/Password/Password";
import { auth, isAdmin, isAuth } from "../../global/slices/auth/auth-actions";
import MessageModal from "../Utils/Modal/MessageModal/MessageModal";
import {
  fetchErrorMessages,
  fetchLoadingMessages,
} from "../../global/fetch/messages/messages";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const [inputError, setInputError] = useState(-1);

  const [fetchStatus, setFetchStatus] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const inputChangeHandler = (index) => {
    if (inputError === index) {
      setInputError(-1);
    }
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    let username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username === "" || username.includes(" ")) {
      setInputError(0);
      return;
    }

    if (password === "") {
      setInputError(1);
      return;
    }

    setIsLoading(true);
    setModal(true);

    username = `${username}`;
    const loginInfo = {
      username,
      password,
    };

    const status = await auth(loginInfo);

    setFetchStatus(status);

    setIsLoading(false);
    setModal(false);

    if (status < 0) {
      setModal(true);
    } else {
      setModal(false);
    }

    if (status === 8) {
      navigate("/");
    }
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  let modalContent = <></>;
  if (fetchStatus < 0) {
    modalContent = (
      <MessageModal
        onClose={closeModalHandler}
        header={fetchErrorMessages(fetchStatus).header}
        img={fetchErrorMessages(fetchStatus).img}
        desc={fetchErrorMessages(fetchStatus).message}
      />
    );
  } else if (isLoading) {
    modalContent = (
      <MessageModal
        onClose={closeModalHandler}
        header={fetchLoadingMessages(fetchStatus).header}
        img={fetchLoadingMessages(fetchStatus).img}
        desc={fetchLoadingMessages(fetchStatus).message}
      />
    );
  }

  return (
    <>
      {modal && modalContent}
      <form className={styles["login-card"]} onSubmit={loginSubmitHandler}>
        <p className={styles["login-header"]}>CTC SYSTEM LOGIN</p>

        <div className={styles["input-container"]}>
          <div className={styles["input-info"]}>
            {inputError === 0 && (
              <p className={styles["err-text"]}>
                Username must not be empty or include any spaces.
              </p>
            )}
            <input
              type="text"
              className={`${styles["input"]} ${
                inputError === 0 && styles["err"]
              }`}
              name="username"
              ref={usernameRef}
              placeholder="Enter your username"
              onChange={() => {
                inputChangeHandler(0);
              }}
            />
          </div>

          <div className={styles["input-info"]}>
            {inputError === 1 && (
              <p className={styles["err-text"]}>Password must not be empty.</p>
            )}
            <Password
              reff={passwordRef}
              className={`${styles["input"]} ${
                inputError === 1 && styles["err"]
              }`}
              placeholder="Enter your password"
              onChange={() => {
                inputChangeHandler(1);
              }}
            />
          </div>
        </div>

        <button className={styles["login-btn"]}>LOGIN</button>
      </form>
    </>
  );
};

export default Auth;
