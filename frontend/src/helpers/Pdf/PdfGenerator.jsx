import {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
  Font,
} from "@react-pdf/renderer";
import React from "react";

import centerLogo from "../../assets/header/logo/center-logo.png";
import unLogo from "../../assets/header/logo/un-logo.png";
import { HEM_TESTS } from "../Tests/HEMHelpers";
import { CHM_TESTS } from "../Tests/CHMHelpers";

const caculateAge = (sample) => {
  const sampleDate = new Date(sample.issuedAt);
  const patientDOB = new Date(sample.patient.dob);

  return (sampleDate - patientDOB) / 365;
};

const HemTableGenerator = ({ sample }) => {
  const { test } = sample;
  const { results } = test;

  const getSIResult = (test) => {
    if (!HEM_TESTS[test.parameter]) {
      return;
    }

    if (HEM_TESTS[test.parameter].defaultResult === "si") {
      return test.result;
    } else {
      return HEM_TESTS[test.parameter].SI.convertFromConventional(test.result);
    }
  };

  const getConventionalResult = (test) => {
    if (!HEM_TESTS[test.parameter]) {
      return;
    }

    if (HEM_TESTS[test.parameter].defaultResult === "conventional") {
      return test.result;
    } else {
      return HEM_TESTS[test.parameter].conventional.convertFromSI(test.result);
    }
  };

  const getLHC = (test) => {
    if (!HEM_TESTS[test.parameter]) {
      return;
    }

    if (HEM_TESTS[test.parameter].defaultResult === "conventional") {
      switch (test.parameter) {
        case "WBC":
        case "RDWCV":
        case "Neutrophils":
        case "Lymphocytes":
        case "Monocytes":
        case "Eosinophils":
        case "Basophils":
          return HEM_TESTS[test.parameter].lhc(
            getConventionalResult(test),
            caculateAge(sample)
          );

        case "RBC":
        case "HGB":
        case "HCT":
        case "MCH":
        case "MCHC":
          return HEM_TESTS[test.parameter].lhc(
            getConventionalResult(test),
            sample.patient.gender,
            caculateAge(sample)
          );

        case "plateletCount":
        case "IG":
          return HEM_TESTS[test.parameter].lhc(getConventionalResult(test));
      }
    } else {
      switch (test.parameter) {
        case "MCV":
          return HEM_TESTS["MCV"].lhc(
            getSIResult(test),
            sample.patient.gender,
            caculateAge(sample)
          );

        case "MPV":
          return HEM_TESTS["MPV"].lhc(getSIResult(test), caculateAge(sample));
      }
    }
  };

  const getNormalRange = (test) => {
    if (!HEM_TESTS[test.parameter]) {
      return [];
    }

    return HEM_TESTS[test.parameter].normalRange.range();
  };

  const unitContainer = (sub) => {
    return (
      <View style={styles.subscriptContainer}>
        <Text style={styles.subscriptMainText}>10</Text>
        <Text style={styles.subscript}>{sub}</Text>
        <Text style={styles.subscriptMainText}>/µL</Text>
      </View>
    );
  };

  const getConventionalUnit = (test) => {
    switch (test.parameter) {
      case "WBC":
      case "plateletCount":
      case "Neutrophils":
      case "Lymphocytes":
      case "Monocytes":
      case "Eosinophils":
      case "Basophils":
      case "IG":
        return unitContainer(3);

      case "RBC":
        return unitContainer(6);

      case "HGB":
      case "MCHC":
        return "g/dL";

      case "HCT":
      case "RDWCV":
        return "%";

      case "MCV":
      case "MPV":
        return (
          <View style={styles.subscriptContainer}>
            <Text style={styles.subscriptMainText}>µm</Text>
            <Text style={styles.subscript}>3</Text>
          </View>
        );

      case "MCH":
        return "pg";
    }
  };

  const getSIUnit = (test) => {
    switch (test.parameter) {
      case "WBC":
      case "plateletCount":
      case "Neutrophils":
      case "Lymphocytes":
      case "Monocytes":
      case "Eosinophils":
      case "Basophils":
      case "IG":
        return unitContainer(9);

      case "RBC":
        return unitContainer(12);

      case "HGB":
      case "MCHC":
        return "g/L";

      case "HCT":
      case "RDWCV":
        return (
          <View style={styles.subscriptContainer}>
            <Text style={styles.subscriptMainText}>/10</Text>
            <Text style={styles.subscript}>2</Text>
          </View>
        );

      case "MCV":
      case "MPV":
        return "fL";

      case "MCH":
        return "pg/cell";
    }
  };

  return (
    <View style={styles.table}>
      <View style={styles.col}>
        <Text style={styles.colHeader}>Parameter</Text>
        {results &&
          results.map((test) => {
            return <Text style={styles.colValue}>{test.parameter}</Text>;
          })}
      </View>

      <View style={styles.col}>
        <Text style={styles.colHeader}>SI Result</Text>
        {results &&
          results.map((test) => {
            return (
              <Text style={styles.colValue}>
                {getSIResult(test)} {getSIUnit(test)}
              </Text>
            );
          })}
      </View>
      <View style={styles.col}>
        <Text style={styles.colHeader}>Conventional Result</Text>
        {results &&
          results.map((test) => {
            return (
              <Text style={styles.colValue}>
                {getConventionalResult(test)} {getConventionalUnit(test)}
              </Text>
            );
          })}
      </View>
      <View style={styles.col}>
        <Text style={styles.colHeader}>L/H/C</Text>
        {results &&
          results.map((test) => {
            return <Text style={styles.colValue}>{getLHC(test)}</Text>;
          })}
      </View>
      <View style={styles.col}>
        <Text style={styles.colHeader}>Normal Range</Text>
        {results &&
          results.map((test) => {
            return (
              <View style={styles.normalRange}>
                {getNormalRange(test).map((res) => {
                  return <Text style={styles.normalRangeCol}>{res}</Text>;
                })}
              </View>
            );
          })}
      </View>
    </View>
  );
};

const ChmTableGenerator = ({ sample }) => {
  const { test } = sample;
  const { results } = test;

  const getSIResult = (test) => {
    if (!CHM_TESTS[test.parameter]) {
      return;
    }

    if (CHM_TESTS[test.parameter].defaultResult === "si") {
      return test.result;
    } else {
      return CHM_TESTS[test.parameter].SI.convertFromConventional(test.result);
    }
  };

  const getConventionalResult = (test) => {
    if (!CHM_TESTS[test.parameter]) {
      return;
    }

    if (CHM_TESTS[test.parameter].defaultResult === "conventional") {
      return test.result;
    } else {
      return CHM_TESTS[test.parameter].conventional.convertFromSI(test.result);
    }
  };

  const getLHC = (test) => {
    if (!HEM_TESTS[test.parameter]) {
      return;
    }

    if (CHM_TESTS[test.parameter].defaultResult === "conventional") {
      switch (test.parameter) {
        case "T_chol":
        case "Tri":
        case "HDL":
        case "UricAcid":
          return CHM_TESTS[test.parameter].lhc(
            getConventionalResult(test),
            sample.patient.gender
          );

        case "LDL":
          return CHM_TESTS[test.parameter].lhc(getConventionalResult(test));

        case "creatinine":
        case "Urea":
        case "Calcium":
        case "Phosphours":
        case "Magnesium":
        case "BilirubinTotal":
        case "BilirubinDirect":
          return CHM_TESTS[test.parameter].lhc(
            getSIResult(test),
            sample.patient.gender,
            getConventionalResult(test)
          );
      }
    } else {
      switch (test.parameter) {
        case "AST":
        case "ALT":
        case "ALK":
        case "LDH":
        case "GGT":
        case "Na":
        case "K":
        case "Cl":
        case "T_Protien":
        case "Albumin":
          return CHM_TESTS[test.parameter].lhc(
            getSIResult(test),
            sample.patient.gender
          );
      }
    }
  };

  const getNormalRange = (test) => {
    if (!HEM_TESTS[test.parameter]) {
      return [];
    }

    return CHM_TESTS[test.parameter].normalRange.range();
  };

  const unitContainer = (sub) => {
    return (
      <View style={styles.subscriptContainer}>
        <Text style={styles.subscriptMainText}>10</Text>
        <Text style={styles.subscript}>{sub}</Text>
        <Text style={styles.subscriptMainText}>/µL</Text>
      </View>
    );
  };

  const getConventionalUnit = (test) => {
    switch (test.parameter) {
      case "AST":
      case "ALT":
      case "ALK":
      case "LDH":
      case "GGT":
        return `µkat/L`;

      case "Na":
      case "K":
      case "Cl":
        return `mEq/L`;

      case "T_chol":
      case "Tri":
      case "HDL":
      case "LDL":
      case "creatinine":
      case "Urea":
      case "UricAcid":
      case "Calcium":
      case "Phosphours":
      case "Magnesium":
      case "BilirubinTotal":
      case "BilirubinDirect":
        return `mg/dL`;

      case "T_Protien":
      case "Albumin":
        return "g/dL";
    }
  };

  const getSIUnit = (test) => {
    switch (test.parameter) {
      case "AST":
      case "ALT":
      case "ALK":
      case "LDH":
      case "GGT":
        return `U/L`;

      case "Na":
      case "K":
      case "Cl":
      case "T_chol":
      case "Tri":
      case "HDL":
      case "LDL":
      case "Urea":
      case "UricAcid":
      case "Calcium":
      case "Phosphours":
      case "Magnesium":
        return `mmol/L`;

      case "creatinine":
      case "BilirubinTotal":
      case "BilirubinDirect":
        return `μmol/L`;

      case "T_Protien":
      case "Albumin":
        return "g/L";
    }
  };

  return (
    <View style={styles.table}>
      <View style={styles.col}>
        <Text style={styles.colHeader}>Parameter</Text>
        {results &&
          results.map((test) => {
            return <Text style={styles.colValue}>{test.parameter}</Text>;
          })}
      </View>

      <View style={styles.col}>
        <Text style={styles.colHeader}>SI Result</Text>
        {results &&
          results.map((test) => {
            return (
              <Text style={styles.colValue}>
                {getSIResult(test)} {getSIUnit(test)}
              </Text>
            );
          })}
      </View>
      <View style={styles.col}>
        <Text style={styles.colHeader}>Conventional Result</Text>
        {results &&
          results.map((test) => {
            return (
              <Text style={styles.colValue}>
                {getConventionalResult(test)} {getConventionalUnit(test)}
              </Text>
            );
          })}
      </View>
      <View style={styles.col}>
        <Text style={styles.colHeader}>L/H/C</Text>
        {results &&
          results.map((test) => {
            return <Text style={styles.colValue}>{getLHC(test)}</Text>;
          })}
      </View>
      <View style={styles.col}>
        <Text style={styles.colHeader}>Normal Range</Text>
        {results &&
          results.map((test) => {
            return (
              <View style={styles.normalRange}>
                {getNormalRange(test).map((res) => {
                  return <Text style={styles.normalRangeCol}>{res}</Text>;
                })}
              </View>
            );
          })}
      </View>
    </View>
  );
};

const PdfGenerator = ({ sample }) => {
  if (!sample) {
    return <></>;
  }

  const { patient, tester, requester, test } = sample;

  return (
    <Document>
      <Page size="A2">
        <View style={styles.header}>
          <Image src={centerLogo} style={styles.centerLogo} />
          <Image src={unLogo} style={styles.unLogo} />
          <Text style={styles.testType}>
            {sample.isRevised === "Y" ? "Revised" : ""}{" "}
            {test.type === "HEM" ? "Hematology" : "Chemistry"}
          </Text>
        </View>

        <View style={styles.line}></View>

        <View style={styles.sampleInfoContainer}>
          <View style={styles.patientInfo}>
            <View style={styles.info}>
              <Text style={styles.label}>Patient name:</Text>
              <Text style={styles.value}>{patient.name}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>Patient phone number:</Text>
              <Text style={styles.value}>{patient.phone}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>Patient date of birth:</Text>
              <Text style={styles.value}>{patient.dob}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>Patient gender:</Text>
              <Text style={styles.value}>
                {patient.gender === "M" ? "Male" : "Female"}
              </Text>
            </View>
          </View>

          <View style={styles.sampleInfo}>
            <View style={styles.info}>
              <Text style={styles.label}>Sample type:</Text>
              <Text style={styles.value}>{sample.type}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>Measurement procedure:</Text>
              <Text style={styles.value}>{sample.measurement}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>Serial number:</Text>
              <Text style={styles.value}>{sample.serialNumber}</Text>
            </View>
          </View>

          <View style={styles.sampleInfo}>
            <View style={styles.info}>
              <Text style={styles.label}>Requester name:</Text>
              <Text style={styles.value}>{requester.name}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>Requester phone no.:</Text>
              <Text style={styles.value}>{requester.phone}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.label}>Tester name:</Text>
              <Text style={styles.value}>{tester.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.resultsTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.testHeader}>Test ID</Text>
            <Text style={styles.testValue}>123123123HEM</Text>
          </View>

          {test.type === "HEM" ? (
            <HemTableGenerator sample={sample} />
          ) : (
            <ChmTableGenerator sample={sample} />
          )}

          <View style={styles.remarksArea}>
            <Text style={styles.remarksText}>Remarks:</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.pageFooter}>
            <View style={styles.footerCol}>
              <View style={styles.info}>
                <Text style={styles.label}>Sample date:</Text>
                <Text style={styles.value}>
                  {sample.issuedAt.split("T")[0]}
                </Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.label}>Sample time:</Text>
                <Text style={styles.value}>
                  {sample.issuedAt.split("T")[1].split(".")[0]}
                </Text>
              </View>
            </View>

            <View style={styles.footerCol}>
              <View style={styles.info}>
                <Text style={styles.label}>Lab supervisor name & sig:</Text>
                <Text style={styles.value}></Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.label}>Lab Director name & sig.:</Text>
                <Text style={styles.value}></Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 20px",
  },
  testType: {
    fontSize: 40,
    letterSpacing: 5,
    textTransform: "capitalize",
    fontWeight: "lighter",
  },
  centerLogo: {
    width: 150,
  },
  unLogo: {
    width: 100,
  },
  line: {
    borderBottom: "3pt solid #00a551",
    marginBottom: "30px",
  },
  sampleInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 40px",
    backgroundColor: "#dddddd",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
  },
  info: {
    flexDirection: "row",
    width: 270,
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 10px",
    borderBottom: "0.5pt solid #000",
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
  },
  value: {
    fontSize: 11,
    textAlign: "center",
    color: "#616161",
  },
  resultsTable: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "30px",
    gap: "30px",
  },
  tableHeader: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  },
  testHeader: {
    fontSize: 13,
    marginBottom: "4px",
  },
  testValue: {
    fontSize: 15,
    color: "#616161",
    letterSpacing: 1,
    marginBottom: "10px",
  },
  table: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    textAlign: "center",
  },
  col: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  colHeader: {
    fontSize: 17,
    letterSpacing: 2,
    fontWeight: "bold",
    borderBottom: "2pt solid #000",
    borderRadius: 5,
    marginBottom: "10px",
  },
  colValue: {
    color: "#616161",
    fontSize: 13,
    margin: "3px",
  },
  remarksArea: {
    alignSelf: "flex-start",
    marginTop: "50px",
    letterSpacing: 3,
    fontSize: 11,
  },
  pageFooter: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3vh",
    backgroundColor: "#dddddd",
    borderRadius: 10,
  },
  footer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: "0",
    padding: "6vh",
  },
  normalRange: {
    fontSize: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  },
  normalRangeCol: { color: "#616161" },
  subscriptMainText: {
    color: "#616161",
    fontSize: 13,
  },
  subscript: {
    color: "#616161",
    verticalAlign: "super",
    transform: "translate(0, -8)",
    fontSize: 7,
  },
  subscriptContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default PdfGenerator;
