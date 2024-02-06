import React, { useRef, useState } from "react";

import styles from "./DeleteUser.module.css";
import ValidateUser from "../../../Utils/Validate/ValidateUser/ValidateUser";
import Header from "../../../Utils/Header/Header";
import Request from "../../../Utils/Request/Request";

const DeleteUserForm = (props) => {
  const [request, setRequest] = useState(false);

  const { user } = props;
  const { name, username, role } = user;
  const roleName =
    role === "P"
      ? "Patient"
      : role === "T"
      ? "Tester"
      : role === "R"
      ? "Requester"
      : "";

  const deactivateUserHandler = () => {
    setRequest(true);
  };

  const closeRequestHandler = () => {
    setRequest(false);
  };

  let headerMsg = `Are you sure you want to delete "${name}" from the system?`;
  let descMsg = `Deleting ${roleName.toLowerCase()} from the system, will only deactivate the ${roleName.toLowerCase()} in the system, and no actual deleteing will happen, so the ${roleName.toLowerCase()} records will stay in the system but the ${roleName.toLowerCase()} will not be able to access the system again or be in further sample reports!`;
  let bouns = `To re-activate the ${roleName.toLowerCase()} just, re-add the ${roleName.toLowerCase()} to the system with the same old username.`;

  if (role === "P") {
    headerMsg = `${roleName} cannot be deleted from the system or deactivated!`;
    descMsg = `${name} is a ${roleName.toLowerCase()}, so she/he cannot be deleted or decativated according to medical software rules and for the safity of patient information and records.`;
  }

  return (
    <>
      {request && (
        <Request
          request={4}
          data={username}
          onClose={closeRequestHandler}
          onClick={props.onDone}
        />
      )}
      <div className="note white-box">
        <p
          className="header"
          style={role === "P" ? { color: "rgb(250, 60, 60)" } : {}}
        >
          {headerMsg}
        </p>
        <p className="desc">{descMsg}</p>
        {role !== "P" && (
          <p className="desc" style={{ color: "rgb(20, 155, 30)" }}>
            {bouns}
          </p>
        )}
        <div className="flex-row-card">
          {role !== "P" && (
            <button className="btn careful-btn" onClick={deactivateUserHandler}>
              Deactivate {roleName.toLowerCase()}
            </button>
          )}
          <button className="btn ok-btn" onClick={props.onDone}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

const DeleteUser = (props) => {
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
    <div>
      <Header />
      {!procced && <ValidateUser admin={props.admin} onNext={proccedHandler} />}
      {procced && (
        <DeleteUserForm
          user={user}
          admin={props.admin}
          onDone={onEditDoneHandler}
        />
      )}
    </div>
  );
};

export default DeleteUser;
