import React, { useRef, useState } from "react";

import styles from "./Validate.module.css";

import Dropdown from "../Dropdown/Dropdown";
import {
  USER_ROLES,
  errorClasses,
  TEST_TYPE_OPTIONS,
} from "../../../global/global";
import { inputErrorMessages } from "../../../global/messages/messages";

const Validate = (props) => {
  const disabled = !props.admin;

  const [option, setOption] = useState(
    props.user ? (disabled ? "P" : "NULL") : "NULL"
  );
  const inputRef = useRef();

  const [inputError, setInputError] = useState(-1);

  const roleName = props.user
    ? disabled || option === "P"
      ? "Patient"
      : option === "R"
      ? "Requester"
      : option === "T"
      ? "Tester"
      : "User"
    : "NULL";

  const onSaveOptionHandler = (option) => {
    if (inputError === 0 || inputError === 9) {
      setInputError(-1);
    }

    setOption(option);
  };

  const validateHandler = (e) => {
    e.preventDefault();

    const inputValue = inputRef.current.value;

    if (option === "NULL") {
      if (props.user) {
        setInputError(0);
      } else {
        setInputError(9);
      }
      return;
    }

    if (inputValue === "" || inputValue.includes(" ")) {
      if (props.user) {
        setInputError(1);
      } else {
        setInputError(8);
      }
      return;
    }

    const info = {
      inputValue,
      option,
    };

    props.onSave(info);
  };

  //***********************************************************************//
  let inputPlaceholderMsg = props.user
    ? `Enter ${roleName.toLowerCase()} username`
    : `Enter test order number`;

  let inputClasses = errorClasses(
    styles["input"],
    props.user ? 1 : 8,
    inputError
  );

  let menuOptions = props.user ? USER_ROLES : TEST_TYPE_OPTIONS;

  let menuMsg = props.user
    ? disabled
      ? "Patient"
      : `Select user role`
    : `Please select test type`;

  let menuClasses = `${errorClasses(
    styles["menu"],
    props.user ? 0 : 9,
    inputError
  )} ${props.user && disabled ? "disabled" : ""}`;

  let btnMsg = props.user
    ? `Validate ${roleName.toLowerCase()}`
    : "Validate test";
  //***********************************************************************//

  return (
    <form className={styles["validate-section"]} onSubmit={validateHandler}>
      <div className={styles["input-box"]}>
        <div className={styles["box"]}>
          {(inputError === 1 || inputError === 8) && (
            <p className="err-text">{inputErrorMessages(inputError)}</p>
          )}
          <input
            type={"text"}
            className={inputClasses}
            placeholder={inputPlaceholderMsg}
            ref={inputRef}
            onChange={() => {
              if (inputError === 1 || inputError === 8) {
                setInputError(-1);
              }
            }}
          />
        </div>

        <div className={styles["box"]}>
          {(inputError === 0 || inputError === 9) && (
            <p className="err-text">{inputErrorMessages(inputError)}</p>
          )}
          <Dropdown
            disabled={props.user && disabled}
            options={menuOptions}
            message={menuMsg}
            className={menuClasses}
            optionsClass={styles["menu-options"]}
            onSave={onSaveOptionHandler}
          />
        </div>
      </div>

      <button className={styles["btn"]}>{btnMsg}</button>
    </form>
  );
};

export default Validate;
