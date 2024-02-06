import React, { useEffect, useRef, useState } from "react";

import Header from "../../../Utils/Header/Header";
import ValidateTest from "../../../Utils/Validate/ValidateTest/ValidateTest";

import styles from "./SaveSample.module.css";
import Dropdown from "../../../Utils/Dropdown/Dropdown";
import {
  SAMPLE_REVISED_OPTIONS,
  errorClasses,
} from "../../../../global/global";
import {
  getActiveUsersRequest,
  getMeasurementProceduresRequest,
  getSampleTypesRequest,
} from "../../../../global/fetch/fetch";
import { inputErrorMessages } from "../../../../global/messages/messages";
import Request from "../../../Utils/Request/Request";

const SaveSampleForm = (props) => {
  const [sampleTypeOptions, setSampleTypeOptions] = useState([]);
  const [measurementProcedureOptions, setMeasurementProcedureOptions] =
    useState([]);

  useEffect(() => {
    const fetchSampleTypesAndMeasurementProcedures = async () => {
      const sampleTypes = await getSampleTypesRequest();
      const measurementProcedures = await getMeasurementProceduresRequest();

      setSampleTypeOptions(
        sampleTypes.map((sample) => {
          return {
            value: sample.name,
            name: sample.name,
          };
        })
      );

      setMeasurementProcedureOptions(
        measurementProcedures.map((measurement) => {
          return {
            value: measurement.name,
            name: measurement.name,
          };
        })
      );
    };

    fetchSampleTypesAndMeasurementProcedures();
  }, []);

  const [request, setRequest] = useState(false);
  const [sample, setSample] = useState(null);

  const [activeRequesters, setActiveRequesters] = useState([]);
  const [activeTesters, setActiveTesters] = useState([]);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      setActiveRequesters(await getActiveUsersRequest("R"));
      setActiveTesters(await getActiveUsersRequest("T"));
    };

    fetchActiveUsers();
  }, []);

  const [sampleType, setSampleType] = useState("NULL");
  const [measurementProcedure, setMeasurementProcedure] = useState("NULL");
  const [isRevised, setIsRevised] = useState("NULL");
  const [requesterUsername, setRequesterUsername] = useState("NULL");
  const [testerUsername, setTesterUsername] = useState("NULL");

  const patientUsernameRef = useRef();
  const sampleSerialNumberRef = useRef();

  const [inputError, setInputError] = useState(-1);

  const onSaveSampleTypeOptionHandler = (type) => {
    if (inputError === 12) {
      setInputError(-1);
    }

    setSampleType(type);
  };

  const onSaveMeasurementProcedure = (measurement) => {
    if (inputError == 16) {
      setInputError(-1);
    }

    setMeasurementProcedure(measurement);
  };

  const onSaveIsRevisedOptionHandler = (isRevised) => {
    if (inputError === 13) {
      setInputError(-1);
    }

    setIsRevised(isRevised);
  };

  const onSaveRequesterUsernameHandler = (rUsername) => {
    if (inputError === 14) {
      setInputError(-1);
    }

    setRequesterUsername(rUsername);
  };

  const onSaveTesterUsernameHandler = (tUsername) => {
    if (inputError === 15) {
      setInputError(-1);
    }

    setTesterUsername(tUsername);
  };

  const saveSampleHandler = (e) => {
    e.preventDefault();

    let patientUsername = patientUsernameRef.current.value;
    const serialNumber = sampleSerialNumberRef.current.value;

    if (patientUsername === "" || patientUsername.includes(" ")) {
      setInputError(10);
      return;
    }

    if (serialNumber === "") {
      setInputError(11);
      return;
    }

    if (sampleType === "NULL") {
      setInputError(12);
      return;
    }

    if (measurementProcedure === "NULL") {
      setInputError(16);
      return;
    }

    if (isRevised === "NULL") {
      setInputError(13);
      return;
    }

    if (requesterUsername === "NULL") {
      setInputError(14);
      return;
    }

    if (testerUsername === "NULL") {
      setInputError(15);
      return;
    }

    patientUsername = `${patientUsername}`;
    const sampleInfo = {
      testId: props.testId,
      patientUsername,
      serialNumber,
      sampleType,
      isRevised,
      requesterUsername,
      testerUsername,
      measurementProcedure,
    };

    setRequest(true);
    setSample(sampleInfo);
  };

  const onCloseRequesetHandler = () => {
    setRequest(false);
  };

  return (
    <>
      {request && (
        <Request request={6} data={sample} onClose={onCloseRequesetHandler} />
      )}
      <form className={styles["save-sample-card"]} onSubmit={saveSampleHandler}>
        <div className="box" style={{ padding: "0", marginBottom: "2rem" }}>
          <p className="header">TEST ID</p>
          <p className="desc">{props.testId}</p>
          <div className="box">
            {inputError === 11 && (
              <p className="err-text">{inputErrorMessages(inputError)}</p>
            )}
            <input
              style={{ width: "25vw" }}
              type="text"
              name="serialNumber"
              className={errorClasses("input", 11, inputError)}
              placeholder="Sample serial number"
              ref={sampleSerialNumberRef}
              onChange={() => {
                if (inputError === 11) {
                  setInputError(-1);
                }
              }}
            />
          </div>
        </div>
        <div className={styles["row-card"]}>
          <div className="box">
            {inputError === 10 && (
              <p className="err-text">{inputErrorMessages(inputError)}</p>
            )}
            <input
              style={{ width: "25vw" }}
              type="text"
              name="username"
              className={errorClasses("input", 10, inputError)}
              placeholder="Patient username"
              ref={patientUsernameRef}
              onChange={() => {
                if (inputError === 10) {
                  setInputError(-1);
                }
              }}
            />
          </div>

          <div className="box">
            {inputError === 12 && (
              <p className="err-text">{inputErrorMessages(inputError)}</p>
            )}
            <Dropdown
              style={{ width: "25vw" }}
              options={sampleTypeOptions}
              message={`Select a sample type`}
              className={errorClasses("menu", 12, inputError)}
              optionsClass="menu-options"
              onSave={onSaveSampleTypeOptionHandler}
            />
          </div>

          <div className="box">
            {inputError === 16 && (
              <p className="err-text">{inputErrorMessages(inputError)}</p>
            )}
            <Dropdown
              style={{ width: "25vw" }}
              options={measurementProcedureOptions}
              message={`Select a measurement`}
              className={errorClasses("menu", 16, inputError)}
              optionsClass="menu-options"
              onSave={onSaveMeasurementProcedure}
            />
          </div>

          <div className="box">
            {inputError === 13 && (
              <p className="err-text">{inputErrorMessages(inputError)}</p>
            )}
            <Dropdown
              style={{ width: "25vw" }}
              options={SAMPLE_REVISED_OPTIONS}
              message={`Is the sample revised?`}
              className={errorClasses("menu", 13, inputError)}
              optionsClass="menu-options"
              onSave={onSaveIsRevisedOptionHandler}
            />
          </div>
          <div className="box">
            {inputError === 14 && (
              <p className="err-text">{inputErrorMessages(inputError)}</p>
            )}
            <Dropdown
              style={{ width: "25vw" }}
              options={activeRequesters}
              message={`Select requester`}
              className={errorClasses("menu", 14, inputError)}
              optionsClass="menu-options"
              onSave={onSaveRequesterUsernameHandler}
            />
          </div>

          <div className="box">
            {inputError === 15 && (
              <p className="err-text">{inputErrorMessages(inputError)}</p>
            )}
            <Dropdown
              style={{ width: "25vw" }}
              options={activeTesters}
              message={`Select tester`}
              className={errorClasses("menu", 15, inputError)}
              optionsClass="menu-options"
              onSave={onSaveTesterUsernameHandler}
            />
          </div>
        </div>

        <div className={styles["btns"]}>
          <button className="btn">Save sample</button>
          <button type="reset" className="btn">
            Clear fields
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              props.onDone();
            }}
          >
            Generate another sample
          </button>
        </div>
      </form>
    </>
  );
};

const SaveSample = (props) => {
  const [procced, setProcced] = useState(false);
  const [testId, setTestId] = useState(null);

  const proccedHandler = (testId) => {
    setTestId(testId);
    setProcced(true);
  };

  const onSaveDoneHandler = () => {
    setProcced(false);
    setTestId(null);
  };

  return (
    <>
      <Header />
      {!procced && <ValidateTest admin={props.admin} onNext={proccedHandler} />}
      {procced && (
        <SaveSampleForm
          testId={testId}
          admin={props.admin}
          onDone={onSaveDoneHandler}
        />
      )}
    </>
  );
};

export default SaveSample;
