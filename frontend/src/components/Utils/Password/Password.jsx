import React, { useState } from "react";

import styles from "./Password.module.css";

const Password = (props) => {
  const [show, setShow] = useState(false);

  const passwordType = show ? "text" : "password";

  const toggleTypeHandler = () => {
    setShow((state) => {
      return !state;
    });
  };

  return (
    <div className={styles["password-card"]}>
      <input
        ref={props.reff}
        type={passwordType}
        className={props.className}
        onChange={props.onChange}
        defaultValue={props.defaultValue ? props.defaultValue : null}
        name="password"
        placeholder={
          props.placeholder ? props.placeholder : "Enter your Password"
        }
      />
      <span onClick={toggleTypeHandler} className={styles["toggle-text"]}>
        {!show ? "SHOW" : "HIDE"}
      </span>
    </div>
  );
};

export default Password;
