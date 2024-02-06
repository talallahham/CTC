export const CHM_TESTS = {
  AST: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 0.0167;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 0.0167;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult > 40) {
        return "High";
      } else if (gender === "F" && siResult > 32) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "Up to 40 U/L, Up to 0.67 μkat/L";
      } else {
        return "Up to 32 U/L, Up to 0.53 μkat/L";
      }
    },
  },
  ALT: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 0.0167;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 0.0167;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult > 41) {
        return "High";
      } else if (gender === "F" && siResult > 33) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "Up to 41 U/L, Up to 0.68";
      } else {
        return "Up to 33 U/L, Up to 0.55";
      }
    },
  },
  ALK: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 0.0167;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 0.0167;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult < 40) {
        return "Low";
      } else if (gender === "M" && siResult > 129) {
        return "High";
      } else if (gender === "F" && siResult < 35) {
        return "Low";
      } else if (gender === "F" && siResult > 104) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "(40 - 129) U/L, (0.67 - 2.15) µkat/L";
      } else {
        return "(35 - 104) U/L, (0.58 - 1.74) µkat/L";
      }
    },
  },
  LDH: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 0.0167;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 0.0167;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult < 135) {
        return "Low";
      } else if (gender === "M" && siResult > 225) {
        return "High";
      } else if (gender === "F" && siResult < 135) {
        return "Low";
      } else if (gender === "F" && siResult > 214) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "(135 - 225) U/L, (2.25 - 3.76) µkat/L";
      } else {
        return "(135 - 214) U/L, (2.25 - 3.57) µkat/L";
      }
    },
  },
  GGT: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 0.0167;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 0.0167;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult < 8) {
        return "Low";
      } else if (gender === "M" && siResult > 61) {
        return "High";
      } else if (gender === "F" && siResult < 5) {
        return "Low";
      } else if (gender === "F" && siResult > 36) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "(8 - 61) U/L, (0.13 - 1.02) µkat/L";
      } else {
        return "(5 - 36) U/L, (0.08 - 0.60) µkat/L";
      }
    },
  },
  Na: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 1;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 1;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult < 136) {
        return "Low";
      } else if (gender === "M" && siResult > 145) {
        return "High";
      } else if (gender === "F" && siResult < 136) {
        return "Low";
      } else if (gender === "F" && siResult > 145) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "(136 - 145) mmol/L, (136 - 145) mEq/L";
      } else {
        return "(136 - 145) mmol/L, (136 - 145) mEq/L";
      }
    },
  },
  K: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 1;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 1;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult < 3.5) {
        return "Low";
      } else if (gender === "M" && siResult > 5.1) {
        return "High";
      } else if (gender === "F" && siResult < 3.5) {
        return "Low";
      } else if (gender === "F" && siResult > 5.1) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "(3.5 - 5.1) mmol/L, (3.5 - 5.1) mEq/L";
      } else {
        return "(3.5 - 5.1) mmol/L, (3.5 - 5.1) mEq/L";
      }
    },
  },
  Cl: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 1;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 1;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult < 98) {
        return "Low";
      } else if (gender === "M" && siResult > 107) {
        return "High";
      } else if (gender === "F" && siResult < 98) {
        return "Low";
      } else if (gender === "F" && siResult > 107) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "(98 - 107) mmol/L, (98 - 107) mEq/L";
      } else {
        return "(98 - 107) mmol/L, (98 - 107) mEq/L";
      }
    },
  },
  T_chol: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * (1 / 0.0259);
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / (1 / 0.0259);
      },
    },
    lhc: (conventionalResult, gender) => {
      if (conventionalResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult > 200) {
        return "High";
      } else if (gender === "F" && conventionalResult > 200) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (conventionalResult, gender) => {
      if (conventionalResult === "") {
        return "";
      } else if (gender === "M") {
        return "(< 5.18) mmol/L, (< 200) mg/dL";
      } else {
        return "(< 5.18) mmol/L, (< 200) mg/dL";
      }
    },
  },
  Tri: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * (1 / 0.0113);
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / (1 / 0.0113);
      },
    },
    lhc: (conventionalResult, gender) => {
      if (conventionalResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult > 150) {
        return "High";
      } else if (gender === "F" && conventionalResult > 150) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (conventionalResult, gender) => {
      if (conventionalResult === "") {
        return "";
      } else if (gender === "M") {
        return "(< 1.70) mmol/L, (< 150) mg/dL";
      } else {
        return "(< 1.70) mmol/L, (< 150) mg/dL";
      }
    },
  },
  HDL: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * (1 / 0.0259);
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / (1 / 0.0259);
      },
    },
    lhc: (conventionalResult, gender) => {
      if (conventionalResult === "") {
        return "";
      } else if (conventionalResult > 55 && gender === "M") {
        return "No Risk";
      } else if (
        conventionalResult >= 35 &&
        conventionalResult <= 55 &&
        gender === "M"
      ) {
        return "Moderate Risk";
      } else if (conventionalResult < 35 && gender === "M") {
        return "High Risk";
      } else if (conventionalResult > 65 && gender === "F") {
        return "No Risk";
      } else if (
        conventionalResult >= 45 &&
        conventionalResult <= 65 &&
        gender === "F"
      ) {
        return "Moderate Risk";
      } else if (conventionalResult < 45 && gender === "F") {
        return "High Risk";
      } else {
        return "false";
      }
    },
    normalRange: (siResult, lhc, gender) => {
      if (siResult === "") {
        return "";
      } else if (lhc === "No Risk" && gender === "M") {
        return "(> 1.42) mmol/L, (> 55) mg/dL";
      } else if (gender === "M" && lhc === "Moderate Risk") {
        return "(0.90 - 1.42) mmol/L, (35 - 55) mg/dL";
      } else if (lhc === "High Risk" && gender === "M") {
        return "(< 0.90) mmol/L, (< 35) mg/dL";
      } else if (lhc === "No Risk" && gender === "F") {
        return "(> 1.68) mmol/L, (> 65) mg/dL";
      } else if (gender === "F" && lhc === "Moderate Risk") {
        return "(1.17 - 1.68) mmol/L, (45 - 65) mg/dL";
      } else if (lhc === "High Risk" && gender === "F") {
        return "(< 1.17) mmol/L, (< 45) mg/dL";
      } else {
        return "";
      }
    },
  },
  LDL: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * (1 / 0.0259);
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / (1 / 0.0259);
      },
    },
    lhc: (conventionalResult) => {
      if (conventionalResult === "") {
        return "";
      } else if (conventionalResult < 100) {
        return "Optimal";
      } else if (conventionalResult >= 100 && conventionalResult <= 129) {
        return "Near Optimal";
      } else if (conventionalResult >= 130 && conventionalResult <= 159) {
        return "Borderline High";
      } else if (conventionalResult >= 160 && conventionalResult <= 189) {
        return "High";
      } else {
        return "Very High";
      }
    },
    normalRange: (conventionalResult, lhc) => {
      if (conventionalResult === "") {
        return "";
      } else if (lhc === "Optimal") {
        return "(< 2.59) mmol/L, (< 100) mg/dL";
      } else if (lhc === "Near Optimal") {
        return "(2.59 - 3.34) mmol/L, (100 - 129) mg/dL";
      } else if (lhc === "Borderline High") {
        return "(3.37 - 4.12) mmol/L, (130 - 159) mg/dL";
      } else if (lhc === "High") {
        return "(4.14 - 4.90) mmol/L, (160 - 189) mg/dL";
      } else if (lhc === "Very High") {
        return "(>= 4.92) mmol/L, (>= 190) mg/dL";
      } else {
        return "";
      }
    },
  },
  creatinine: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * (1 / 88.4);
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / (1 / 88.4);
      },
    },
    lhc: (siResult, gender, conventionalResult) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult < 0.7) {
        return "Low";
      } else if (gender === "M" && conventionalResult > 1.2) {
        return "High";
      } else if (gender === "F" && conventionalResult < 0.5) {
        return "Low";
      } else if (gender === "F" && conventionalResult > 0.9) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "(61.88 - 106.08) μmol/L, (0.7 - 1.2) mg/dL";
      } else {
        return "(44.20 - 79.56) μmol/L, (0.7 - 1.2) mg/dL";
      }
    },
  },
  Urea: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * (1 / 0.357);
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / (1 / 0.357);
      },
    },
    lhc: (siResult, gender, conventionalResult) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult < 16.6) {
        return "Low";
      } else if (gender === "M" && conventionalResult > 48.5) {
        return "High";
      } else if (gender === "F" && conventionalResult < 16.6) {
        return "Low";
      } else if (gender === "F" && conventionalResult > 48.5) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M") {
        return "(5.93 - 17.315) mmol/L, (16.60 - 48.5) mg/dL";
      } else {
        return "(5.93 - 17.315) mmol/L, (16.60 - 48.5) mg/dL";
      }
    },
  },
  UricAcid: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / (1 / 0.357);
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * (1 / 0.357);
      },
    },
    lhc: (conventionalResult, gender) => {
      if (conventionalResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult < 3.4) {
        return "Low";
      } else if (gender === "M" && conventionalResult > 7) {
        return "High";
      } else if (gender === "F" && conventionalResult < 2.4) {
        return "Low";
      } else if (gender === "F" && conventionalResult > 5.7) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (conventionalResult, gender) => {
      if (conventionalResult === "") {
        return "";
      } else if (gender === "M") {
        return "(0.20 - 0.42) mmol/L, (3.4 - 7.0) mg/dL";
      } else {
        return "(0.14 - 0.34) mmol/L, (2.4 - 5.7) mg/dL";
      }
    },
  },
  T_Protien: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 0.1;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 0.1;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult < 66) {
        return "Low";
      } else if (gender === "M" && siResult > 87) {
        return "High";
      } else if (gender === "F" && siResult < 66) {
        return "Low";
      } else if (gender === "F" && siResult > 87) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (G34) => {
      if (G34 === "") {
        return "";
      } else {
        return "(66 - 87) g/L, (6.60 - 8.70) g/dL";
      }
    },
  },
  Albumin: {
    defaultResult: "si",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult * 0.1;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult / 0.1;
      },
    },
    lhc: (siResult, gender) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && siResult < 35) {
        return "Low";
      } else if (gender === "M" && siResult > 52) {
        return "High";
      } else if (gender === "F" && siResult < 35) {
        return "Low";
      } else if (gender === "F" && siResult > 52) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult) => {
      if (siResult === "") {
        return "";
      } else {
        return "(35 - 52) g/L, (3.50 - 5.20) g/dL";
      }
    },
  },
  Calcium: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 0.25;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 0.25;
      },
    },
    lhc: (siResult, gender, conventionalResult) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult < 6.8) {
        return "Low";
      } else if (gender === "M" && conventionalResult > 10) {
        return "High";
      } else if (gender === "F" && conventionalResult < 6.8) {
        return "Low";
      } else if (gender === "F" && conventionalResult > 10) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (conventionalResult) => {
      if (conventionalResult === "") {
        return "";
      } else {
        return "(2.15 - 2.50) mmol/L, (8.6 - 10.0) mg/dL";
      }
    },
  },
  Phosphours: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 0.323;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 0.323;
      },
    },
    lhc: (siResult, gender, conventionalResult) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult < 2.5) {
        return "Low";
      } else if (gender === "M" && conventionalResult > 4.5) {
        return "High";
      } else if (gender === "F" && conventionalResult < 2.5) {
        return "Low";
      } else if (gender === "F" && conventionalResult > 4.5) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult) => {
      if (siResult === "") {
        return "";
      } else {
        return "(0.81 - 1.45) mmol/L, (2.5 - 4.5) mg/dL";
      }
    },
  },
  Magnesium: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 0.4114;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 0.4114;
      },
    },
    lhc: (siResult, gender, conventionalResult) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult < 1.6) {
        return "Low";
      } else if (gender === "M" && conventionalResult > 2.6) {
        return "High";
      } else if (gender === "F" && conventionalResult < 1.6) {
        return "Low";
      } else if (gender === "F" && conventionalResult > 2.6) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult) => {
      if (siResult === "") {
        return "";
      } else {
        return "(0.66 - 1.07) mmol/L, (1.60 - 2.60) mg/dL";
      }
    },
  },
  BilirubinTotal: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 17.104;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 17.104;
      },
    },
    lhc: (siResult, gender, conventionalResult) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult > 1.2) {
        return "High";
      } else if (gender === "F" && conventionalResult > 1.2) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult) => {
      if (siResult === "") {
        return "";
      } else {
        return "(Up to 20.52) μmol/L, (Up to 1.2) mg/dL";
      }
    },
  },
  BilirubinDirect: {
    defaultResult: "conventional",
    conventional: {
      convertFromSI: (siResult) => {
        return siResult / 17.104;
      },
    },
    SI: {
      convertFromConventional: (conventionalResult) => {
        return conventionalResult * 17.104;
      },
    },
    lhc: (siResult, gender, conventionalResult) => {
      if (siResult === "") {
        return "";
      } else if (gender === "M" && conventionalResult > 0.2) {
        return "High";
      } else if (gender === "F" && conventionalResult > 0.2) {
        return "High";
      } else {
        return "Normal";
      }
    },
    normalRange: (siResult) => {
      if (siResult === "") {
        return "";
      } else {
        return "(≤ 3.42) μmol/L, (≤ 0.2) mg/dL";
      }
    },
  },
};
