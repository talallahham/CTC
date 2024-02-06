export const HEM_TESTS = {
  WBC: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (conventionalResult <= 1.5 || conventionalResult >= 100) {
        return "Critical";
      } else if (age > 18 && age <= 21 && conventionalResult < 4.5) {
        return "L";
      } else if (age < 21 && conventionalResult > 13) {
        return "H";
      } else if (age > 21 && conventionalResult < 4.5) {
        return "L";
      } else if (age > 21 && conventionalResult > 11) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Range (18 - 21) Years: (4.5 - 13)",
          "Range (>21) Years: (4.5 - 11)",
        ];
      },
      unit: `10⁶/µL`,
    },
  },
  RBC: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult, gender, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (
        gender === "M" &&
        age > 18 &&
        age <= 45 &&
        conventionalResult < 4.3
      ) {
        return "L";
      } else if (
        gender === "M" &&
        age > 18 &&
        age <= 45 &&
        conventionalResult > 5.7
      ) {
        return "H";
      } else if (
        gender === "M" &&
        age > 45 &&
        age < 65 &&
        conventionalResult < 4.2
      ) {
        return "L";
      } else if (
        gender === "M" &&
        age > 45 &&
        age < 65 &&
        conventionalResult > 5.6
      ) {
        return "H";
      } else if (gender === "M" && age > 65 && conventionalResult < 3.8) {
        return "L";
      } else if (gender === "M" && age > 65 && conventionalResult > 5.8) {
        return "H";
      } else if (gender === "F" && age < 18 && conventionalResult < 3.8) {
        return "L";
      } else if (
        gender === "F" &&
        age > 18 &&
        age <= 45 &&
        conventionalResult > 5.6
      ) {
        return "H";
      } else if (
        gender === "F" &&
        age > 45 &&
        age < 65 &&
        conventionalResult < 3.8
      ) {
        return "L";
      } else if (
        gender === "F" &&
        age > 45 &&
        age < 65 &&
        conventionalResult > 5.3
      ) {
        return "H";
      } else if (gender === "F" && age > 65 && conventionalResult < 3.8) {
        return "L";
      } else if (gender === "F" && age > 65 && conventionalResult > 5.2) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Male: Range (18 - 45) Years: (4.3 - 5.7)",
          "Male: Range (45 - 65) Years: (4.2 - 5.6)",
          "Male: Range (>65) Years: (3.8 - 5.8)",
          "Female: Range (18 - 45) Years: (3.8 - 5.1)",
          "Female: Range (45 - 65) Years: (3.8 - 5.3)",
          "Female: Range (>65) Years: (3.8 - 5.2)",
        ];
      },
      unit: `10&#xB9;&#x2076;/&#xB5;L`,
    },
  },
  HGB: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 10.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 10.0;
      },
    },
    lhc: (conventionalResult, gender, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (
        (gender === "M" || gender === "F") &&
        conventionalResult >= 20
      ) {
        return "Critical";
      } else if (conventionalResult < 7) {
        return "Critical";
      } else if (
        gender === "M" &&
        age > 18 &&
        age <= 44 &&
        conventionalResult < 13.2
      ) {
        return "L";
      } else if (
        gender === "M" &&
        age > 18 &&
        age <= 44 &&
        conventionalResult > 17.3
      ) {
        return "H";
      } else if (
        gender === "M" &&
        age > 44 &&
        age < 65 &&
        conventionalResult < 13.1
      ) {
        return "L";
      } else if (
        gender === "M" &&
        age > 44 &&
        age < 65 &&
        conventionalResult > 17.2
      ) {
        return "H";
      } else if (gender === "M" && age > 65 && conventionalResult < 12.6) {
        return "L";
      } else if (gender === "M" && age > 65 && conventionalResult > 17.4) {
        return "H";
      } else if (gender === "F" && age < 18 && conventionalResult < 11.7) {
        return "L";
      } else if (
        gender === "F" &&
        age > 18 &&
        age <= 44 &&
        conventionalResult > 15.5
      ) {
        return "H";
      } else if (
        gender === "F" &&
        age > 44 &&
        age < 65 &&
        conventionalResult < 11.7
      ) {
        return "L";
      } else if (
        gender === "F" &&
        age > 44 &&
        age < 65 &&
        conventionalResult > 16
      ) {
        return "H";
      } else if (gender === "F" && age > 65 && conventionalResult < 11.7) {
        return "L";
      } else if (gender === "F" && age > 65 && conventionalResult > 16.1) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Male: Range (18 - 44) Years:  (13.2 - 17.3)",
          "Male: Range (44 - 65) Years: (13.1 - 17.2)",
          "Male: Range (>65) Years: (12.6 - 17.4)",
          "Female: Range (18 - 44) Years (11.7  - 15.5)",
          "Female: Range (44 - 65) Years: (11.7 - 16)",
          "Female: Range (>65) Years: (11.7 - 16.1)",
        ];
      },
      unit: `g/dL`,
    },
  },
  HCT: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 100.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 100.0;
      },
    },
    lhc: (conventionalResult, gender, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (
        gender === "M" &&
        age > 18 &&
        age <= 44 &&
        conventionalResult < 39
      ) {
        return "L";
      } else if (
        gender === "M" &&
        age > 18 &&
        age <= 44 &&
        conventionalResult > 49
      ) {
        return "H";
      } else if (
        gender === "M" &&
        age > 44 &&
        age < 65 &&
        conventionalResult < 39
      ) {
        return "L";
      } else if (
        gender === "M" &&
        age > 44 &&
        age < 65 &&
        conventionalResult > 50
      ) {
        return "H";
      } else if (gender === "M" && age > 65 && conventionalResult < 37) {
        return "L";
      } else if (gender === "M" && age > 65 && conventionalResult > 51) {
        return "H";
      } else if (gender === "F" && age < 18 && conventionalResult < 35) {
        return "L";
      } else if (
        gender === "F" &&
        age > 18 &&
        age <= 44 &&
        conventionalResult > 45
      ) {
        return "H";
      } else if (
        gender === "F" &&
        age > 44 &&
        age < 65 &&
        conventionalResult < 35
      ) {
        return "L";
      } else if (
        gender === "F" &&
        age > 44 &&
        age < 65 &&
        conventionalResult > 47
      ) {
        return "H";
      } else if (gender === "F" && age > 65 && conventionalResult < 35) {
        return "L";
      } else if (gender === "M" && age > 65 && conventionalResult > 47) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Male: Range (18 - 44) Years: (39 - 49)",
          "Male: Range (44 - 65) Years: (39 - 50)",
          "Male: Range (>65) Years: (37 - 51)",
          "Female: Range (18 - 44) Years: (35  - 45)",
          "Female: Range (>44) Years: (35 - 47)",
        ];
      },
      unit: `%`,
    },
  },
  MCV: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 1.0;
      },
    },
    lhc: (siResult, gender, age) => {
      if (gender === "") {
        return "";
      } else if (gender === "M" && age > 18 && age <= 44 && siResult < 80) {
        return "L";
      } else if (gender === "M" && age > 18 && age <= 44 && siResult > 99) {
        return "H";
      } else if (gender === "M" && age > 44 && age < 65 && siResult < 81) {
        return "L";
      } else if (gender === "M" && age > 44 && age < 65 && siResult > 101) {
        return "H";
      } else if (gender === "M" && age > 65 && siResult < 81) {
        return "L";
      } else if (gender === "M" && age > 65 && siResult > 103) {
        return "H";
      } else if (gender === "F" && age < 18 && siResult < 81) {
        return "L";
      } else if (gender === "F" && age > 18 && age <= 44 && siResult > 100) {
        return "H";
      } else if (gender === "F" && age > 44 && siResult < 81) {
        return "L";
      } else if (gender === "F" && age > 44 && siResult > 101) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Male: Range (18 - 44), Years: (80 - 99)",
          "Male: Range (44 - 65), Years: (81 - 101)",
          "Male: Range (>65), Years: (81 - 103)",
          "Female: Range (18 - 44), Years: (81  - 100)",
          "Female: Range (>44), Years: (81 - 101)",
        ];
      },
      unit: `fL`,
    },
  },
  MCH: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult, gender, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (gender === "M" && age > 18 && conventionalResult < 27) {
        return "L";
      } else if (gender === "M" && age > 18 && conventionalResult > 34) {
        return "H";
      } else if (gender === "F" && age > 18 && conventionalResult < 27) {
        return "L";
      } else if (
        gender === "F" &&
        age > 18 &&
        age <= 65 &&
        conventionalResult > 34
      ) {
        return "H";
      } else if (gender === "F" && age > 65 && conventionalResult < 27) {
        return "L";
      } else if (gender === "F" && age > 65 && conventionalResult > 35) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Male: Range (>18) Years: (27 - 34)",
          "Female: Range (18 - 65) Years: (27  - 34)",
          "Female: Range (>65) Years: (27 - 35)",
        ];
      },
      unit: `pg`,
    },
  },
  MCHC: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 10.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 10.0;
      },
    },
    lhc: (conventionalResult, gender, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (
        gender === "M" &&
        age > 18 &&
        age <= 44 &&
        conventionalResult < 32
      ) {
        return "L";
      } else if (
        gender === "M" &&
        age > 18 &&
        age < 44 &&
        conventionalResult > 37
      ) {
        return "H";
      } else if (
        gender === "M" &&
        age > 44 &&
        age < 65 &&
        conventionalResult < 32
      ) {
        return "L";
      } else if (
        gender === "M" &&
        age > 44 &&
        age < 65 &&
        conventionalResult > 36
      ) {
        return "H";
      } else if (gender === "M" && age > 65 && conventionalResult < 31) {
        return "L";
      } else if (gender === "M" && age > 65 && conventionalResult > 36) {
        return "H";
      } else if (
        gender === "F" &&
        age > 18 &&
        age <= 44 &&
        conventionalResult < 32
      ) {
        return "L";
      } else if (
        gender === "F" &&
        age > 18 &&
        age <= 44 &&
        conventionalResult > 36
      ) {
        return "H";
      } else if (gender === "F" && age > 44 && conventionalResult < 31) {
        return "L";
      } else if (gender === "F" && age > 44 && conventionalResult > 36) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Male: Range (18 - 44) Years: (32 - 37)",
          "Male: Range (44 - 65) Years: (32 - 36)",
          "Male: Range (>65) Years: (31 - 36)",
          "Female: Range (18 - 44) Years: (32  - 36)",
          "Female: Range (>44) Years: (31 - 36)",
        ];
      },
      unit: `g/dL`,
    },
  },
  plateletCount: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult) => {
      if (conventionalResult === "") {
        return "";
      } else if (conventionalResult < 40 || conventionalResult > 1000) {
        return "Critical";
      } else if (conventionalResult < 140) {
        return "L";
      } else if (conventionalResult > 400) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return ["(140 - 400)"];
      },
      unit: `10&#x207B;&#xB9;/&#xB5;L`,
    },
  },
  RDWCV: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 100.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 100.0;
      },
    },
    lhc: (conventionalResult, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (age > 0.5 && conventionalResult < 11.6) {
        return "L";
      } else if (age > 0.5 && conventionalResult > 14.8) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return ["Range (>6) Months: (11.6 - 14.8)"];
      },
      unit: `%`,
    },
  },
  MPV: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (siResult, age) => {
      if (siResult === "") {
        return "";
      } else if (age > 0.5 && siResult < 9.6) {
        return "L";
      } else if (age > 0.5 && siResult > 12) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return ["Range (>6) Months: (9.6 - 12)"];
      },
      unit: `fL`,
    },
  },
  Neutrophils: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (age >= 10 && age <= 21 && conventionalResult < 1.8) {
        return "L";
      } else if (age >= 10 && age <= 21 && conventionalResult > 8) {
        return "H";
      } else if (age > 21 && conventionalResult < 1.8) {
        return "L";
      } else if (age > 21 && conventionalResult > 7.7) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Range (10 - 21) Years: (1.8 - 8)",
          "Range (>21) Years: (1.8 - 7.7)",
        ];
      },
      unit: `10&#x207B;&#xB9;/&#xB5;L`,
    },
  },
  Lymphocytes: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (age >= 10 && age <= 21 && conventionalResult < 1) {
        return "L";
      } else if (age >= 10 && age <= 21 && conventionalResult > 4.8) {
        return "H";
      } else if (age > 21 && conventionalResult < 1.5) {
        return "L";
      } else if (age > 21 && conventionalResult > 4) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Range (10 - 21) Years: (1 - 4.8)",
          "Range (>21) Years: (1.5 - 4.0)",
        ];
      },
      unit: `10&#x207B;&#xB9;/&#xB5;L`,
    },
  },
  Monocytes: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (age >= 10 && age <= 21 && conventionalResult > 0.8) {
        return "H";
      } else if (age > 21 && conventionalResult < 0.2) {
        return "L";
      } else if (age > 21 && conventionalResult > 0.95) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Range (10 - 21) Years: (0 - 0.8)",
          "Range (>21) Years: (0.2 - 0.95)",
        ];
      },
      unit: `10&#x207B;&#xB9;/&#xB5;L`,
    },
  },
  Eosinophils: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (age >= 10 && age <= 21 && conventionalResult > 0.5) {
        return "H";
      } else if (age > 21 && conventionalResult > 0.7) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Range (10 - 21) Years: (0 - 0.5)",
          "Range (>21) Years: (0 - 0.7)",
        ];
      },
      unit: `10&#x207B;&#xB9;/&#xB5;L`,
    },
  },
  Basophils: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult, age) => {
      if (conventionalResult === "") {
        return "";
      } else if (age >= 10 && age <= 21 && conventionalResult > 0.2) {
        return "H";
      } else if (age > 21 && conventionalResult > 0.15) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return [
          "Range (10 - 21) Years: (0 - 0.20)",
          "Range (>21) Years: (0 - 0.15)",
        ];
      },
      unit: `10&#x207B;&#xB9;/&#xB5;L`,
    },
  },
  IG: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 1.0;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 1.0;
      },
    },
    lhc: (conventionalResult) => {
      if (conventionalResult === "") {
        return "";
      } else if (conventionalResult > 0.6) {
        return "H";
      } else {
        return "Normal";
      }
    },
    normalRange: {
      range: () => {
        return ["(0.0 - 0.6)"];
      },
      unit: `10&#x207B;&#xB9;/&#xB5;L`,
    },
  },
};
