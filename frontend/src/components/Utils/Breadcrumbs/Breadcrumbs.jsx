import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./Breadcrumbs.module.css";

const PAGE_TITLE = {
  "/": "Home Page",
  "/samples": "Samples Page",
  "/samples/sample/:id": "Sample Info Page",
  "/samples/sample/save": "Save Sample Page",
  "/samples/sample/types": "Sample Types Page",
  "/samples/sample/measurements": "Sample Measurements Page",
  "/samples/user/:id": "User Samples Page",

  "/users": "Users Page",
  "/users/user/:id": "User Info Page",
  "/users/user/add": "Add User Page",
  "users/user/edit": "Edit User Page",
  "/users/user/delete": "Delete User Page",
};

const Breadcrumbs = () => {
  const location = useLocation();

  let current = "";
  const curmbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      current += `/${crumb}`;

      return (
        <div key={crumb}>
          <Link to={current}>{crumb.replaceAll("%20", " ")} /</Link>
        </div>
      );
    });

  let pageTitle = "";
  if (
    location.pathname.startsWith("/samples/sample/") &&
    location.pathname !== "/samples/sample/save" &&
    location.pathname !== "/samples/sample/types" &&
    location.pathname !== "/samples/sample/measurements"
  ) {
    pageTitle = PAGE_TITLE["/samples/sample/:id"];
  } else if (location.pathname.startsWith("/samples/user/")) {
    pageTitle = PAGE_TITLE["/samples/user/:id"];
  } else if (
    location.pathname.startsWith("/users/user/") &&
    location.pathname !== "/users/user/add" &&
    location.pathname !== "/users/user/edit" &&
    location.pathname !== "/users/user/delete"
  ) {
    pageTitle = PAGE_TITLE["/users/user/:id"];
  } else {
    pageTitle = PAGE_TITLE[location.pathname];
  }

  return (
    <div className={styles["breadcrumbs-section"]}>
      <h1>{pageTitle}</h1>
      <div className={styles["crumb"]}>{curmbs}</div>
    </div>
  );
};

export default Breadcrumbs;
