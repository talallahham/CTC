const url = "http://localhost:8080/ctc";

const addUserPath = "/users/user/add";
const reactivateUser = "/users/user/reactivate";
const getUser = "/users/user/get?username=";
const editUser = "/users/user/edit";
const deactivateUser = "/users/user/deactivate?username=";
const validateTest = "/tests/test/validate?testId=";
const saveSample = "/samples/sample/save";

const addSampleType = "/samples/types/add";
const addMeasurementProcedure = "/samples/measurement_procedure/add";
const editSampleType = "/samples/types/edit";
const editMeasurementProcedure = "/samples/measurement_procedure/edit";
const deleteSampleType = "/samples/types/delete?sampleType=";
const deleteMeasurementProcedure =
  "/samples/measurement_procedure/delete?measurementProcedure=";
const getSampleTypes = "/samples/types/get";
const getMeasurementProcedures = "/samples/measurement_procedures/get";

export const ADD_USER_URL = url + addUserPath;
export const REACTIVATE_USER_URL = url + reactivateUser;
export const GET_USER_REQUEST = url + getUser;
export const EDIT_USER_URL = url + editUser;
export const DEACTIVATE_USER_URL = url + deactivateUser;
export const VALIDATE_TEST_URL = url + validateTest;
export const SAVE_SAMPLE_URL = url + saveSample;

export const ADD_SAMPLE_TYPE_URL = url + addSampleType;
export const ADD_MEASUREMENT_PROCEDURE_URL = url + addMeasurementProcedure;
export const EDIT_SAMPLE_TYPE_URL = url + editSampleType;
export const EDIT_MEASUREMENT_PROCEDURE_URL = url + editMeasurementProcedure;
export const DELETE_SAMPLE_TYPE_URL = url + deleteSampleType;
export const DELETE_MEASUREMENT_PROCEDURE_URL =
  url + deleteMeasurementProcedure;
export const GET_SAMPLE_TYPES_URL = url + getSampleTypes;
export const GET_MEASUREMENT_PROCEDURES_URL = url + getMeasurementProcedures;

/* NON-REQUEST URLS */
const getActiveUsers = "/users/active/get?role=";
const getUsers = "/users/get?role=";
const getSamples = "/samples/get";
const getUserSamples = "/samples/user/get?username=";
const getSample = "/samples/sample/get?serialNumber=";
const getUserInfo = "/users/user/info/get?username=";

export const GET_ACTIVE_USERS_URL = url + getActiveUsers;
export const GET_USERS_URL = url + getUsers;
export const GET_SAMPLES_URL = url + getSamples;
export const GET_USER_SAMPLES_URL = url + getUserSamples;
export const GET_SAMPLE_URL = url + getSample;
export const GET_USER_INFO_URL = url + getUserInfo;

/* AUTH URLS */
const auth = "/auth";
const isAdmin = "/validate/admin";

export const AUTH_URL = url + auth;
export const IS_ADMIN_URL = url + isAdmin;
