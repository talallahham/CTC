import React, { useEffect, useState } from "react";
import TMList from "../../../Utils/TMList/TMList";
import {
  addMeasurementProcedureRequest,
  deleteMeasurementProcedureRequest,
  editMeasurementProcedureRequest,
  getMeasurementProceduresRequest,
} from "../../../../global/fetch/fetch";

const SampleMeasurement = () => {
  const [sampleMeasurementProceduresList, setSampleMeasurementProceduresList] =
    useState([]);

  const onAdd = (measurementProcedure) => {
    let vaild = true;
    let found = false;

    if (measurementProcedure === "") {
      vaild = false;
    }

    sampleMeasurementProceduresList.forEach((item) => {
      found |= measurementProcedure === item.name;
    });

    if (!found && vaild) {
      addMeasurementProcedureRequest(measurementProcedure);
    }

    return {
      vaild,
      found,
    };
  };

  const onEdit = (index, measurementProcedure) => {
    let vaild = true;
    let found = false;

    if (measurementProcedure === "") {
      vaild = false;
    }

    sampleMeasurementProceduresList.forEach((item) => {
      found |= measurementProcedure === item.name;
    });

    if (!found && vaild) {
      editMeasurementProcedureRequest(
        sampleMeasurementProceduresList[index].name,
        measurementProcedure
      );
    }

    return {
      vaild,
      found,
    };
  };

  const onDelete = (index) => {
    deleteMeasurementProcedureRequest(
      sampleMeasurementProceduresList[index].name
    );
  };

  useEffect(() => {
    const fetchMeasurementProceduresList = async () => {
      setSampleMeasurementProceduresList(
        await getMeasurementProceduresRequest()
      );
    };

    fetchMeasurementProceduresList();
  }, [onAdd, onDelete, onEdit]);

  return (
    <>
      <TMList
        title={"Measurement procedures"}
        list={
          sampleMeasurementProceduresList ? sampleMeasurementProceduresList : []
        }
        onAdd={onAdd}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </>
  );
};

export default SampleMeasurement;
