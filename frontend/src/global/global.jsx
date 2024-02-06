import CryptoJS from "crypto-js";

export const USER_ROLES = [
  { value: "P", name: "Patient" },
  { value: "R", name: "Requester" },
  { value: "T", name: "Tester" },
];

export const GENDER_OPTIONS = [
  { value: "M", name: "Male" },
  { value: "F", name: "Female" },
];

export const TEST_TYPE_OPTIONS = [
  { value: "HEM", name: "Hemotalogy" },
  { value: "CHM", name: "Chimsty" },
];

export const SAMPLE_REVISED_OPTIONS = [
  { value: "N", name: "No" },
  { value: "Y", name: "Yes" },
];

export const IS_REVISED_OPTIONS_FILTER = [
  ...SAMPLE_REVISED_OPTIONS,
  { value: "NULL", name: "All" },
];

export const SAMPLE_TYPE_OPTIONS_FILTER = [
  { value: "Serum", name: "Serum" },
  { value: "Whole Blood", name: "Whole Blood" },
  { value: "NULL", name: "All" },
];

export const GENDER_OPTIONS_FILTER = [
  ...GENDER_OPTIONS,
  { value: "NULL", name: "All" },
];

export const IS_ACTIVE_OPTIONS_FILTER = [
  { value: "A", name: "Active" },
  { value: "NA", name: "Not active" },
  { value: "NULL", name: "All" },
];

export const SAMPLE_FILTER_BY_OPTIONS = [
  { value: "by serial number", name: "Filter by serial number" },
  { value: "by sample date", name: "Filter by sample date" },
  { value: "by test", name: "Filter by test id" },
  { value: "NULL", name: "Clear filter" },
];

export const USER_FILTER_BY_OPTIONS = [
  { value: "by username", name: "Filter by username" },
  { value: "by name", name: "Filter by name" },
  { value: "by phone", name: "Filter by phone" },
  { value: "by email", name: "Filter by email" },
  { value: "by dob", name: "Filter by dob" },
  { value: "by start date", name: "Filter by start date" },
  { value: "by end date", name: "Filter by end date" },
  { value: "NULL", name: "Clear filter" },
];

export const errorClasses = (type, element, error) => {
  if (element === error) {
    return `${type} err`;
  }

  return type;
};

export const encrypt = (data, secretKey) => {
  const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encrypted;
};

export const decrypt = (data, secretKey) => {
  const decrypted = CryptoJS.AES.decrypt(data, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
};
