import React, { useState } from "react";

import styles from "./Dropdown.module.css";

import dropdown from "../../../assets/utils/dropdown.png";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    props.message ? props.message : "Select an option"
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.name);
    if (option.value) {
      if (option.value === "NONE" || option.value === "NULL") {
        setSelectedOption(props.message);
        setIsOpen(false);
      }

      if (props.onSave) {
        props.onSave(option.value);
      }

      setIsOpen(false);
      return;
    }

    props.onSave(option.username);
    setIsOpen(false);
    return;
  };

  return (
    <div className={`${styles["dropdown"]}`}>
      <button
        style={props.style}
        type="button"
        className={props.className}
        onClick={toggleDropdown}
        disabled={props.disabled}
      >
        {selectedOption}
        <img src={dropdown} className={styles["icon-class"]} />
      </button>

      {props.options && isOpen && (
        <ul className={`${styles["dropdown-list"]} ${props.optionsClass}`}>
          {props.options.map((option) => {
            return (
              <li
                key={option.value}
                onClick={() => {
                  handleOptionClick(option);
                }}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
