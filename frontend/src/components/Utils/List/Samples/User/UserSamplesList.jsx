import React, { useEffect, useState } from "react";
import List from "../../List";
import { getUserSamplesRequest } from "../../../../../global/fetch/fetch";
import Header from "../../../Header/Header";

const UserSamplesList = (props) => {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchUserSamples = async () => {
      setList(await getUserSamplesRequest(props.username));
    };

    fetchUserSamples().catch(() => {
      setList([]);
    });
  }, []);

  return <>{list && <List list={list} admin={props.admin} samples={true} />}</>;
};

export default UserSamplesList;
