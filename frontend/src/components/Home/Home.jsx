import React, { useState } from "react";

import styles from "./Home.module.css";
import Header from "../Utils/Header/Header";

import bAddSample from "../../assets/options/addsample/1-addsample.png";
import wAddSample from "../../assets/options/addsample/2-addsample.png";

import bAddUser from "../../assets/options/adduser/1-adduser.png";
import wAddUser from "../../assets/options/adduser/2-adduser.png";

import bDeleteUser from "../../assets/options/deleteuser/1-deleteuser.png";
import wDeleteUser from "../../assets/options/deleteuser/2-deleteuser.png";

import bEditUser from "../../assets/options/edituser/1-edituser.png";
import wEditUser from "../../assets/options/edituser/2-edituser.png";

import bSamples from "../../assets/options/samples/1-samples.png";
import wSamples from "../../assets/options/samples/2-samples.png";

import bUsers from "../../assets/options/users/1-users.png";
import wUsers from "../../assets/options/users/2-users.png";

import bBloodTest from "../../assets/options/bloodTest/1-bloodtest.png";
import wBloodTest from "../../assets/options/bloodTest/2-bloodtest.png";

import bMeasurement from "../../assets/options/measurement/1-measurement.png";
import wMeasurement from "../../assets/options/measurement/2-measurement.png";

import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();

  const [images, setImages] = useState([
    { shown: bAddSample, bImg: bAddSample, wImg: wAddSample },
    { shown: bSamples, bImg: bSamples, wImg: wSamples },
    { shown: bUsers, bImg: bUsers, wImg: wUsers },
    { shown: bAddUser, bImg: bAddUser, wImg: wAddUser },
    { shown: bEditUser, bImg: bEditUser, wImg: wEditUser },
    { shown: bDeleteUser, bImg: bDeleteUser, wImg: wDeleteUser },
    { shown: bBloodTest, bImg: bBloodTest, wImg: wBloodTest },
    { shown: bMeasurement, bImg: bMeasurement, wImg: wMeasurement },
  ]);

  const optionOnEnterHoverHandler = (index) => {
    const tempImages = [...images];
    tempImages[index].shown = tempImages[index].wImg;
    setImages(tempImages);
  };

  const optionOnLeaveHoverHandler = (index) => {
    const tempImages = [...images];
    tempImages[index].shown = tempImages[index].bImg;
    setImages(tempImages);
  };

  const user = props.admin ? "User" : "Patient";
  const users = props.admin ? "Users" : "Patients";

  const navigateToHandler = (page) => {
    switch (page) {
      case 0:
        navigate("/samples/sample/save");
        return;

      case 1:
        navigate("/samples");
        return;

      case 2:
        navigate("/users");
        return;

      case 3:
        navigate("/users/user/add");
        return;

      case 4:
        navigate("users/user/edit");
        return;

      case 5:
        navigate("/users/user/delete");
        return;

      case 6:
        navigate("/samples/sample/types");
        return;

      case 7:
        navigate("/samples/sample/measurements");
        return;
    }
  };

  return (
    <>
      <Header />
      <section className={styles["home-section"]}>
        <div className={styles["options"]}>
          <div
            className={styles["option"]}
            onClick={() => {
              navigateToHandler(0);
            }}
            onMouseEnter={() => {
              optionOnEnterHoverHandler(0);
            }}
            onMouseLeave={() => {
              optionOnLeaveHoverHandler(0);
            }}
          >
            <p className={styles["option-label"]}>Save sample</p>
            <img src={images[0].shown} className={styles["option-img"]} />
          </div>

          <div
            className={styles["option"]}
            onClick={() => {
              navigateToHandler(1);
            }}
            onMouseEnter={() => {
              optionOnEnterHoverHandler(1);
            }}
            onMouseLeave={() => {
              optionOnLeaveHoverHandler(1);
            }}
          >
            <p className={styles["option-label"]}>Show Samples</p>
            <img src={images[1].shown} className={styles["option-img"]} />
          </div>

          <div
            className={styles["option"]}
            onClick={() => {
              navigateToHandler(2);
            }}
            onMouseEnter={() => {
              optionOnEnterHoverHandler(2);
            }}
            onMouseLeave={() => {
              optionOnLeaveHoverHandler(2);
            }}
          >
            <p className={styles["option-label"]}>Show {users.toLowerCase()}</p>
            <img src={images[2].shown} className={styles["option-img"]} />
          </div>

          <div
            className={styles["option"]}
            onClick={() => {
              navigateToHandler(3);
            }}
            onMouseEnter={() => {
              optionOnEnterHoverHandler(3);
            }}
            onMouseLeave={() => {
              optionOnLeaveHoverHandler(3);
            }}
          >
            <p className={styles["option-label"]}>Add {user.toLowerCase()}</p>
            <img src={images[3].shown} className={styles["option-img"]} />
          </div>

          <div
            className={styles["option"]}
            onClick={() => {
              navigateToHandler(4);
            }}
            onMouseEnter={() => {
              optionOnEnterHoverHandler(4);
            }}
            onMouseLeave={() => {
              optionOnLeaveHoverHandler(4);
            }}
          >
            <p className={styles["option-label"]}>Edit {user.toLowerCase()}</p>
            <img src={images[4].shown} className={styles["option-img"]} />
          </div>

          {props.admin && (
            <div
              className={styles["option"]}
              onClick={() => {
                navigateToHandler(5);
              }}
              onMouseEnter={() => {
                optionOnEnterHoverHandler(5);
              }}
              onMouseLeave={() => {
                optionOnLeaveHoverHandler(5);
              }}
            >
              <p className={styles["option-label"]}>
                Delete {user.toLowerCase()}
              </p>
              <img src={images[5].shown} className={styles["option-img"]} />
            </div>
          )}

          {props.admin && (
            <div
              className={styles["option"]}
              onClick={() => {
                navigateToHandler(6);
              }}
              onMouseEnter={() => {
                optionOnEnterHoverHandler(6);
              }}
              onMouseLeave={() => {
                optionOnLeaveHoverHandler(6);
              }}
            >
              <p className={styles["option-label"]}>Sample types</p>
              <img src={images[6].shown} className={styles["option-img"]} />
            </div>
          )}

          {props.admin && (
            <div
              className={styles["option"]}
              onClick={() => {
                navigateToHandler(7);
              }}
              onMouseEnter={() => {
                optionOnEnterHoverHandler(7);
              }}
              onMouseLeave={() => {
                optionOnLeaveHoverHandler(7);
              }}
            >
              <p className={styles["option-label"]}>Measurement procedures</p>
              <img src={images[7].shown} className={styles["option-img"]} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
