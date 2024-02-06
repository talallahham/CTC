import React, { useEffect, useState } from "react";
import List from "../List";
import { getSamplesRequest } from "../../../../global/fetch/fetch";
import Header from "../../Header/Header";

const SamplesList = (props) => {
  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchSamples = async () => {
      setList(await getSamplesRequest());
    };

    fetchSamples().catch(() => {
      setList([]);
    });
  }, []);

  return <>{list && <List list={list} admin={props.admin} samples={true} />}</>;
};

export default SamplesList;
