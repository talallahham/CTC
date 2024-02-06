import React, { useEffect, useState } from "react";

import styles from "./UserInfo.module.css";
import Header from "../../../Utils/Header/Header";
import { getUserInfoRequest } from "../../../../global/fetch/fetch";
import { useNavigate } from "react-router-dom";

const UserInfoContent = ({ user }) => {
  return (
    <section className={styles["user-card"]}>
      <div className={styles["col"]}>
        <div className={styles["info"]}>
          <div className={styles["header"]}>Username</div>
          <div className={styles["value"]}>{user.username}</div>
        </div>

        <div className={styles["info"]}>
          <div className={styles["header"]}>Role</div>
          <div className={styles["value"]}>
            {user.role === "P"
              ? "Patient"
              : user.role === "R"
              ? "Requester"
              : "Tester"}
          </div>
        </div>

        <div className={styles["info"]}>
          <div className={styles["header"]}>Name</div>
          <div className={styles["value"]}>{user.name}</div>
        </div>

        <div className={styles["info"]}>
          <div className={styles["header"]}>Phone number</div>
          <div className={styles["value"]}>{user.phone}</div>
        </div>

        {user.email && user.email !== "" && (
          <div className={styles["info"]}>
            <div className={styles["header"]}>Email</div>
            <div className={styles["value"]}>{user.email}</div>
          </div>
        )}
      </div>

      <div className={styles["col"]}>
        <div className={styles["info"]}>
          <div className={styles["header"]}>Gender</div>
          <div className={styles["value"]}>
            {user.gender === "M" ? "Male" : "Female"}
          </div>
        </div>

        <div className={styles["info"]}>
          <div className={styles["header"]}>Date of birth</div>
          <div className={styles["value"]}>{user.dob}</div>
        </div>

        <div className={styles["info"]}>
          <div className={styles["header"]}>Start date</div>
          <div className={styles["value"]}>{user.startDate.split("T")[0]}</div>
        </div>

        <div className={styles["info"]}>
          <div className={styles["header"]}>Start time</div>
          <div className={styles["value"]}>
            {user.startDate.split("T")[1].split(".")[0]}
          </div>
        </div>

        <div className={styles["info"]}>
          <div className={styles["header"]}>Is active?</div>
          <div className={styles["value"]}>{user.isActive ? "Yes" : "No"}</div>
        </div>

        {!user.isActive && user.endDate && (
          <>
            <div className={styles["info"]}>
              <div className={styles["header"]}>End date</div>
              <div className={styles["value"]}>
                {user.endDate.split("T")[0]}
              </div>
            </div>

            <div className={styles["info"]}>
              <div className={styles["header"]}>End time</div>
              <div className={styles["value"]}>
                {user.endDate.split("T")[1].split(".")[0]}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const UserInfo = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserInfoRequest(props.username);
      if (response.found) {
        setUser(response.user);
      } else {
        navigate("/");
      }
    };

    fetchUser().catch(() => {
      setUser(undefined);
    });
  }, []);

  return (
    <>
      {user && (
        <>
          <Header />
          <UserInfoContent user={user} />
        </>
      )}
    </>
  );
};

export default UserInfo;
