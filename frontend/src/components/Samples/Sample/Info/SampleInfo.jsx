import React, { useEffect, useState } from "react";

import styles from "./SampleInfo.module.css";
import { getSampleRequest } from "../../../../global/fetch/fetch";
import { useNavigate } from "react-router-dom";
import Header from "../../../Utils/Header/Header";
import PdfDownloadButton from "../../../../helpers/Pdf/PdfDownloadButton";

const TestResultsTable = (props) => {
  const { test } = props;
  const { results } = test;
  return (
    <div className={styles["test-info-card"]}>
      <div className={styles["test-info-header"]}>
        <div className={styles["info"]}>
          <h1 className={styles["header"]}>TEST ID</h1>
          <p className={styles["value"]}>{test.id}</p>
        </div>

        <div className={styles["info"]}>
          <h1 className={styles["header"]}>Patient</h1>
          <p className={styles["value"]}>{test.patient.substring(2)}</p>
        </div>
      </div>

      <div className={styles["test-results-table"]}>
        <div className={styles["table-col"]}>
          <p className={styles["header-col"]}>Parameter</p>
          <div className={styles["col-results"]}>
            {results.map((result) => {
              return (
                <p key={result.number} className={styles["body-col"]}>
                  {result.parameter}
                </p>
              );
            })}
          </div>
        </div>

        <div className={styles["table-col"]}>
          <p className={styles["header-col"]}>Test number</p>
          <div className={styles["col-results"]}>
            {results.map((result) => {
              return (
                <p key={result.number} className={styles["body-col"]}>
                  {result.number}
                </p>
              );
            })}
          </div>
        </div>

        <div className={styles["table-col"]}>
          <p className={styles["header-col"]}>Test result</p>
          <div className={styles["col-results"]}>
            {results.map((result) => {
              return (
                <p key={result.number} className={styles["body-col"]}>
                  {result.result}
                </p>
              );
            })}
          </div>
        </div>

        <div className={styles["table-col"]}>
          <p className={styles["header-col"]}>Test unit</p>
          <div className={styles["col-results"]}>
            {results.map((result) => {
              return (
                <p key={result.number} className={styles["body-col"]}>
                  {result.unit}
                </p>
              );
            })}
          </div>
        </div>

        <div className={styles["table-col"]}>
          <p className={styles["header-col"]}>SI unit</p>
          <div className={styles["col-results"]}>
            {results.map((result) => {
              return (
                <p key={result.number} className={styles["body-col"]}>
                  {result.unit}
                </p>
              );
            })}
          </div>
        </div>

        <div className={styles["table-col"]}>
          <p className={styles["header-col"]}>Conventional unit</p>
          <div className={styles["col-results"]}>
            {results.map((result) => {
              return (
                <p key={result.number} className={styles["body-col"]}>
                  {result.unit}
                </p>
              );
            })}
          </div>
        </div>

        <div className={styles["table-col"]}>
          <p className={styles["header-col"]}>L/H/C</p>
          <div className={styles["col-results"]}>
            {results.map((result) => {
              return (
                <p key={result.number} className={styles["body-col"]}>
                  {result.unit}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <button className={styles["btn"]} onClick={props.onClick}>
        Hide test results
      </button>
    </div>
  );
};

const SampleInfoContent = (props) => {
  const navigate = useNavigate();

  const [showTest, setShowTest] = useState(false);

  const { sample } = props;
  const { test } = sample;

  const patientInfoShowHandler = () => {
    const { patient } = sample;
    const { username } = patient;
    navigate(`/users/user/${username}`);
  };

  const requesterInfoShowHandler = () => {
    const { requester } = sample;
    const { username } = requester;
    console.log(username);
    navigate(`/users/user/${username}`);
  };

  const testerInfoShowHandler = () => {
    const { tester } = sample;
    const { username } = tester;
    navigate(`/users/user/${username}`);
  };

  const toggleShowTestHandler = () => {
    setShowTest((state) => !state);
  };

  return (
    <>
      {!showTest && (
        <section className={styles["sample-info-card"]}>
          <div className={styles["sample-card"]}>
            <div className={styles["col"]}>
              <p className={styles["row-header"]}>SAMPLE INFO</p>
              <div className={styles["content"]}>
                <div className={styles["info"]}>
                  <p className={styles["header"]}>Sample issued at date</p>
                  <p className={styles["value"]}>
                    {sample.issuedAt.split("T")[0]}
                  </p>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Sample issued at time</p>
                  <p className={styles["value"]}>
                    {sample.issuedAt.split("T")[1].split(".")[0]}
                  </p>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Sample serial number</p>
                  <p className={styles["value"]}>{sample.serialNumber}</p>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Is sample revised?</p>
                  <p className={styles["value"]}>
                    {sample.isRevised ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles["col"]}>
              <p className={styles["row-header"]}>TEST INFO</p>
              <div className={styles["content"]}>
                <div className={styles["info"]}>
                  <p className={styles["header"]}>TEST ID</p>
                  <p className={styles["value"]}>{test.id}</p>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Test issued at date</p>
                  <p className={styles["value"]}>
                    {test.issuedAt.split("T")[0]}
                  </p>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Test issued at time</p>
                  <p className={styles["value"]}>
                    {test.issuedAt.split("T")[1].split(".")[0]}
                  </p>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Test order number</p>
                  <p className={styles["value"]}>{test.orderNumber}</p>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Test type</p>
                  <p className={styles["value"]}>
                    {test.type === "HEM" ? "Hematology" : "Chemistry"}
                  </p>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Test results</p>
                  <button
                    className={styles["info-btn"]}
                    onClick={toggleShowTestHandler}
                  >
                    Show test results
                  </button>
                </div>
              </div>
            </div>

            <div className={styles["col"]}>
              <p className={styles["row-header"]}>PERSONs INFO</p>
              <div className={styles["content"]}>
                <div className={styles["info"]}>
                  <p className={styles["header"]}>Patient Info</p>
                  <button
                    className={styles["info-btn"]}
                    onClick={patientInfoShowHandler}
                  >
                    Show patient info
                  </button>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Requester Info</p>
                  <button
                    className={styles["info-btn"]}
                    onClick={requesterInfoShowHandler}
                  >
                    Show requester info
                  </button>
                </div>

                <div className={styles["info"]}>
                  <p className={styles["header"]}>Tester Info</p>
                  <button
                    className={styles["info-btn"]}
                    onClick={testerInfoShowHandler}
                  >
                    Show tester info
                  </button>
                </div>
              </div>
            </div>
          </div>
          <PdfDownloadButton
            sample={sample}
            fileName={`${props.sample.patient.username}?${props.sample.test.id}.pdf`}
            className={styles["btn"]}
            btnText={`GENERATE & DOWNLOAD PDF`}
          />
        </section>
      )}

      {showTest && (
        <TestResultsTable test={test} onClick={toggleShowTestHandler} />
      )}
    </>
  );
};

const SampleInfo = (props) => {
  const navigate = useNavigate();
  const [sample, setSample] = useState(undefined);

  useEffect(() => {
    const fetchSample = async () => {
      const response = await getSampleRequest(props.serialNumber);
      if (response.found) {
        setSample(response.sample);
      } else {
        navigate("/");
      }
    };

    fetchSample().catch(() => {
      setSample(undefined);
    });
  }, []);

  return (
    <>
      {sample && (
        <>
          <Header />
          <SampleInfoContent sample={sample} />
        </>
      )}
    </>
  );
};

export default SampleInfo;
