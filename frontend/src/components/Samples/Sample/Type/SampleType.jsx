import React, { useEffect, useState } from "react";
import TMList from "../../../Utils/TMList/TMList";
import {
  addSampleTypeRequest,
  deleteSampleTypeRequest,
  editSampleTypeRequest,
  getSampleTypesRequest,
} from "../../../../global/fetch/fetch";

const SampleType = () => {
  const [sampleTypesList, setSampleTypesList] = useState([]);

  const onAdd = (testType) => {
    let vaild = true;
    let found = false;

    if (testType === "") {
      vaild = false;
    }

    sampleTypesList.forEach((item) => {
      found |= testType === item.name;
    });

    if (!found && vaild) {
      addSampleTypeRequest(testType);
    }

    return {
      vaild,
      found,
    };
  };

  const onEdit = (index, testType) => {
    let vaild = true;
    let found = false;

    if (testType === "") {
      vaild = false;
    }

    sampleTypesList.forEach((item) => {
      found |= testType === item.name;
    });

    if (!found && vaild) {
      editSampleTypeRequest(sampleTypesList[index].name, testType);
    }

    return {
      vaild,
      found,
    };
  };

  const onDelete = (index) => {
    deleteSampleTypeRequest(sampleTypesList[index].name);
  };

  useEffect(() => {
    const fetchSampleTypesList = async () => {
      setSampleTypesList(await getSampleTypesRequest());
    };

    fetchSampleTypesList();
  }, [onAdd, onEdit, onDelete]);

  return (
    <section>
      <TMList
        title={"Sample test types"}
        list={sampleTypesList ? sampleTypesList : []}
        onAdd={onAdd}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </section>
  );
};

export default SampleType;
