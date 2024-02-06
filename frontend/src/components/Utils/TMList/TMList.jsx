import React, { Fragment, useEffect, useState } from "react";

import styles from "./TMList.module.css";

const TMList = (props) => {
  if (!props.list || props.list.length === 0) {
    return (
      <p className={styles["empty-list"]}>
        There are no logs found for ({props.title}).
      </p>
    );
  }

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [inputError, setInputError] = useState({
    status: -1,
    message: "",
  });

  const hideAddFormHandler = () => {
    setShowAddForm(false);
  };

  const showAddFormHandler = () => {
    setShowAddForm(true);
  };

  const hideEditFormHandler = () => {
    setShowEditForm(false);
    setEditIndex(-1);
  };

  const showEditFormHandler = (idx) => {
    setShowEditForm(true);
    setEditIndex(idx);
  };

  const clearInputErrorHandler = () => {
    setInputError({
      status: -1,
      message: "",
    });
  };

  const addTestTypeHandler = (e) => {
    e.preventDefault();
    const response = props.onAdd(e.target[0].value);

    if (!response.vaild) {
      setInputError({
        status: 1,
        message: "Enter a valid value, please.",
      });
      return;
    }

    if (response.found) {
      setInputError({
        status: 2,
        message: "Test type already found! please try again.",
      });
      return;
    }

    setInputError({
      status: -1,
      message: "",
    });
  };

  const editTestTypeHandler = (e) => {
    e.preventDefault();
    const response = props.onEdit(editIndex, e.target[0].value);

    if (!response.vaild) {
      setInputError({
        status: 1,
        message: "You can't edit to empty-value. please enter a valild value.",
      });
      return;
    }

    if (response.found) {
      setInputError({
        status: 2,
        message: "Test type already found! please try again.",
      });
      return;
    }

    setInputError({
      status: -1,
      message: "",
    });

    hideEditFormHandler();
  };

  const formInputClasses =
    inputError.status !== -1
      ? ` ${styles["addform-input"]} ${styles["err-class"]}`
      : `${styles["addform-input"]}`;

  return (
    <section className={styles["tmlist-section"]}>
      <div className={styles["tmlist-header"]}>
        <p>{props.title}</p>
        <button className={styles["add-btn"]} onClick={showAddFormHandler}>
          add
        </button>
      </div>
      {showAddForm && (
        <form className={styles["form"]} onSubmit={addTestTypeHandler}>
          <section>
            <input
              type="text"
              placeholder="Enter a new test type"
              className={formInputClasses}
              onChange={clearInputErrorHandler}
            />
            {inputError.status !== -1 && (
              <p className={styles["err-msg"]}>{inputError.message}</p>
            )}
          </section>
          <div>
            <button className={styles["addbtn-f"]}>add</button>
            <button
              className={styles["cancelbtn-f"]}
              onClick={hideAddFormHandler}
              type="button"
            >
              cancel
            </button>
          </div>
        </form>
      )}
      <ul className={styles["list"]}>
        {props.list.map((item, index) => {
          return (
            <Fragment key={item.name}>
              <li className={styles["list-item"]} key={item.name}>
                <p>{item.name}</p>
                <div>
                  <button
                    className={styles["delete-btn"]}
                    onClick={() => {
                      props.onDelete(index);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className={styles["edit-btn"]}
                    onClick={() => {
                      showEditFormHandler(index);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </li>
              {showEditForm && index === editIndex && (
                <form
                  className={`${styles["form"]} ${styles["edit-form"]}`}
                  onSubmit={editTestTypeHandler}
                >
                  <section>
                    <input
                      type="text"
                      placeholder="Enter a new test type"
                      className={formInputClasses}
                      onChange={clearInputErrorHandler}
                    />
                    {inputError.status !== -1 && (
                      <p className={styles["err-msg"]}>{inputError.message}</p>
                    )}
                  </section>
                  <div>
                    <button className={styles["addbtn-f"]}>Edit</button>
                    <button
                      className={styles["cancelbtn-f"]}
                      onClick={hideEditFormHandler}
                      type="button"
                    >
                      cancel
                    </button>
                  </div>
                </form>
              )}
            </Fragment>
          );
        })}
      </ul>
    </section>
  );
};

export default TMList;
