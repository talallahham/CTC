import React, { useEffect, useState } from "react";
import { getUsersRequest } from "../../../../global/fetch/fetch";
import List from "../List";
import Header from "../../Header/Header";

const UsersList = (props) => {
  const [list, setList] = useState(null);
  const [role, setRole] = useState("P");

  useEffect(() => {
    const fetchUsers = async () => {
      setList(await getUsersRequest(role));
    };

    fetchUsers().catch(() => {
      setList([]);
    });
  }, [role]);

  const onRoleChangeHandler = (role) => {
    setRole(role);
  };

  return (
    <>
      {list && (
        <List
          list={list}
          role={role}
          onRoleChange={onRoleChangeHandler}
          admin={props.admin}
          users={true}
        />
      )}
    </>
  );
};

export default UsersList;
