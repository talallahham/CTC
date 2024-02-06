import React, { useRef, useState } from "react";

import styles from "./EditUser.module.css";
import ValidateUser from "../../../Utils/Validate/ValidateUser/ValidateUser";
import Header from "../../../Utils/Header/Header";
import { inputErrorMessages } from "../../../../global/messages/messages";
import { GENDER_OPTIONS, errorClasses } from "../../../../global/global";
import Dropdown from "../../../Utils/Dropdown/Dropdown";
import Password from "../../../Utils/Password/Password";
import Request from "../../../Utils/Request/Request";
import { useNavigate } from "react-router-dom";

const EditUserForm = (props) => {
  const navigate = useNavigate();

  const { user } = props;

  const [request, setRequest] = useState(false);
  const [newUser, setNewUser] = useState(null);

  const { role, username } = user;
  const roleName =
    role === "P" ? "Patient" : role === "T" ? "Tester" : "Requester";

  const [gender, setGender] = useState(user.gender === "M" ? "Male" : "Female"); //old gender value

  const [passwordEditEnabled, setPasswordEditEnabled] = useState(false);

  const passwordRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const dobRef = useRef();

  const [inputError, setInputError] = useState(-1);

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

  const togglePasswordHandler = () => {
    setPasswordEditEnabled((state) => !state);
  };

  const editUserHandler = (e) => {
    e.preventDefault();

    const password = passwordRef.current?.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const dob = dobRef.current.value;

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

    setRequest(true);
    setNewUser(userInfo);
  };

  const onCloseRequestHandler = () => {
    setRequest(false);
  };

  return (
    <>
      {request && (
        <Request request={3} data={newUser} onClose={onCloseRequestHandler} />
      )}
      <form
        className={`${styles["edit-user"]} white-box`}
        onSubmit={editUserHandler}
      >
        <div className={styles["input-container"]}>
          <p className="input disabled err">{roleName}</p>
          <p className="input disabled err">{username.substring(2)}</p>

          {role === "T" && passwordEditEnabled && (
            <div className="info fill-width">
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

          <div className="info fill-width">
            {inputError === 3 && (
              <p className="err-text">{inputErrorMessages(3)}</p>
            )}
            <input
              defaultValue={user.name}
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

          <div className="info fill-width">
            {inputError === 4 && (
              <p className="err-text">{inputErrorMessages(4)}</p>
            )}
            <input
              defaultValue={user.email}
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

          <div className="info fill-width">
            {inputError === 5 && (
              <p className="err-text">{inputErrorMessages(5)}</p>
            )}
            <input
              defaultValue={user.phone}
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

          <div className="info fill-width">
            {inputError === 6 && (
              <p className="err-text">{inputErrorMessages(6)}</p>
            )}
            <Dropdown
              options={GENDER_OPTIONS}
              message={`${user.gender === "M" ? "Male" : "Female"}`}
              className={errorClasses("menu", 6, inputError)}
              optionsClass="menu-options"
              onSave={onSaveGender}
              onChange={() => {
                inputChangeHandler(6);
              }}
            />
          </div>

          <div className="info fill-width">
            {inputError === 7 ? (
              <p className="err-text">{inputErrorMessages(7)}</p>
            ) : (
              <p className="label">
                Select {roleName.toLowerCase()} date of birth
              </p>
            )}
            <input
              defaultValue={user.dob}
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

        <div className="flex-row-card">
          <button className={`${styles["btn"]} btn`}>
            Edit {roleName.toLowerCase()}
          </button>
          <button
            className={styles["btn"]}
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel edit
          </button>
          {role === "T" && (
            <button
              type="button"
              className={`${styles["btn"]} btn`}
              onClick={togglePasswordHandler}
            >
              {passwordEditEnabled ? "Disable" : "Enable"} password edit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

const EditUser = (props) => {
  const [procced, setProcced] = useState(false);
  const [user, setUser] = useState(null);

  const proccedHandler = (user) => {
    setUser(user);
    setProcced(true);
  };

  const onEditDoneHandler = () => {
    setProcced(false);
    setUser(null);
  };

  return (
    <>
      <Header />
      {!procced && <ValidateUser admin={props.admin} onNext={proccedHandler} />}
      {procced && (
        <div className="flex-col-card">
          <div className="note white-box">
            <p className="header">Username & User role cannot be edit!</p>
            <p className="desc">
              Username and user role cannot be edited or changed at all, so you
              can edit all fields except these two fileds.
            </p>
          </div>
          <EditUserForm
            user={user}
            admin={props.admin}
            onDone={onEditDoneHandler}
          />
        </div>
      )}
    </>
  );
};

export default EditUser;
