import React, { useRef, useState } from "react";

import styles from "./AddUser.module.css";
import Header from "../../../Utils/Header/Header";
import Dropdown from "../../../Utils/Dropdown/Dropdown";
import {
  GENDER_OPTIONS,
  USER_ROLES,
  errorClasses,
} from "../../../../global/global";
import Password from "../../../Utils/Password/Password";
import { inputErrorMessages } from "../../../../global/messages/messages";
import Request from "../../../Utils/Request/Request";

const AddUser = (props) => {
  /* API REQUEST ATTRIBUTES */
  const [user, setUser] = useState(null);
  const [request, setRequest] = useState(false);
  const onRequestDoneHandler = () => {
    // setUser(null);
    setRequest(false);
  };
  /* * * * * * * * * * * * * * * * * * */

  const disabled = !props.admin;

  const [role, setRole] = useState(disabled ? "P" : "NULL");
  const [gender, setGender] = useState("NULL");

  const usernameRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const dobRef = useRef();

  const [inputError, setInputError] = useState(-1);

  const roleName =
    disabled || role === "P"
      ? "Patient"
      : role === "T"
      ? "Tester"
      : role === "R"
      ? "Requester"
      : "";

  const onSaveRole = (role) => {
    if (inputError === 0) {
      setInputError(-1);
    }

    setRole(role);
  };

  const onSaveGender = (gender) => {
    if (inputError === 6) {
      setInputError(-1);
    }

    setGender(gender);
  };

  const inputChangeHandler = (element) => {
    if (element === inputError) {
      setInputError(-1);
    }
  };

  const addUserHandler = (e) => {
    e.preventDefault();

    let username = usernameRef.current.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const dob = dobRef.current.value;

    if (role === "NULL") {
      setInputError(0);
      return;
    }

    if (username === "" || username.includes(" ")) {
      setInputError(1);
      return;
    }

    if (password === "" && passwordRef.current) {
      setInputError(2);
      return;
    }

    if (name === "") {
      setInputError(3);
      return;
    }

    if (email !== "" && !email.includes("@")) {
      setInputError(4);
      return;
    }

    if (phone === "" || isNaN(Number(phone))) {
      setInputError(5);
      return;
    }

    if (gender === "NULL") {
      setInputError(6);
      return;
    }

    if (dob === "") {
      setInputError(7);
      return;
    }

    username = `${username}`;
    const userInfo = {
      role,
      username,
      password,
      name,
      email,
      phone,
      gender,
      dob,
    };

    /* ACTIVATE REQUEST COMPONENT */
    setUser(userInfo);
    setRequest(true);
    /* * * * * * * *  * * * * *  */
  };

  return (
    <>
      <Header />
      {request && (
        <Request request={0} data={user} onClose={onRequestDoneHandler} />
      )}
      <form
        className={`${styles["add-user"]} white-box`}
        onSubmit={addUserHandler}
      >
        <div className={styles["row"]}>
          <div className={styles["col"]}>
            <div className="info">
              {inputError === 0 && (
                <p className="err-text">{inputErrorMessages(0)}</p>
              )}
              <Dropdown
                disabled={disabled}
                message={disabled ? roleName : `Select user role`}
                options={USER_ROLES}
                className={
                  disabled
                    ? "menu disabled"
                    : errorClasses("menu", 0, inputError)
                }
                optionsClass="menu-options"
                onSave={onSaveRole}
              />
            </div>

            <div className="info">
              {inputError === 1 && (
                <p className="err-text">{inputErrorMessages(1)}</p>
              )}
              <input
                type="text"
                className={errorClasses("input", 1, inputError)}
                name="username"
                placeholder={`Enter ${roleName.toLowerCase()} username`}
                ref={usernameRef}
                onChange={() => {
                  inputChangeHandler(1);
                }}
              />
            </div>

            {role === "T" && (
              <div className="info">
                {inputError === 2 && (
                  <p className="err-text">{inputErrorMessages(2)}</p>
                )}
                <Password
                  type="text"
                  className={errorClasses("input", 2, inputError)}
                  placeholder={`Enter ${roleName.toLowerCase()} password`}
                  reff={passwordRef}
                  onChange={() => {
                    inputChangeHandler(2);
                  }}
                />
              </div>
            )}

            <div className="info">
              {inputError === 3 && (
                <p className="err-text">{inputErrorMessages(3)}</p>
              )}
              <input
                type="text"
                className={errorClasses("input", 3, inputError)}
                name="name"
                placeholder={`Enter ${roleName.toLowerCase()} full name`}
                ref={nameRef}
                onChange={() => {
                  inputChangeHandler(3);
                }}
              />
            </div>
          </div>

          <div className={styles["col"]}>
            {" "}
            <div className="info">
              {inputError === 4 && (
                <p className="err-text">{inputErrorMessages(4)}</p>
              )}
              <input
                type="text"
                className={errorClasses("input", 4, inputError)}
                name="email"
                placeholder={`Enter ${roleName.toLowerCase()} email (Optional)`}
                ref={emailRef}
                onChange={() => {
                  inputChangeHandler(4);
                }}
              />
            </div>
            <div className="info">
              {inputError === 5 && (
                <p className="err-text">{inputErrorMessages(5)}</p>
              )}
              <input
                type="text"
                className={errorClasses("input", 5, inputError)}
                name="phone"
                placeholder={`Enter ${roleName.toLowerCase()} phone number`}
                ref={phoneRef}
                onChange={() => {
                  inputChangeHandler(5);
                }}
              />
            </div>
            <div className="info">
              {inputError === 6 && (
                <p className="err-text">{inputErrorMessages(6)}</p>
              )}
              <Dropdown
                options={GENDER_OPTIONS}
                message={`Select ${roleName.toLowerCase()} gender`}
                className={errorClasses("menu", 6, inputError)}
                optionsClass="menu-options"
                onSave={onSaveGender}
                onChange={() => {
                  inputChangeHandler(6);
                }}
              />
            </div>
            <div className="info">
              {inputError === 7 ? (
                <p className="err-text">{inputErrorMessages(7)}</p>
              ) : (
                <p className="label">
                  Select {roleName.toLowerCase()} date of birth
                </p>
              )}
              <input
                type="date"
                className={errorClasses("input", 7, inputError)}
                name="dob"
                ref={dobRef}
                onChange={() => {
                  inputChangeHandler(7);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-row-card">
          <button className={`${styles["btn"]} btn`}>
            Add {roleName.toLowerCase()}
          </button>
          <button type="reset" className={`${styles["btn"]} btn`}>
            Clear fileds
          </button>
        </div>
      </form>
    </>
  );
};

export default AddUser;
