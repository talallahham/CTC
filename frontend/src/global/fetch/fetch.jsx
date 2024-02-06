import SampleType from "../../components/Samples/Sample/Type/SampleType";
import {
  ADD_MEASUREMENT_PROCEDURE_URL,
  ADD_SAMPLE_TYPE_URL,
  ADD_USER_URL,
  DEACTIVATE_USER_URL,
  DELETE_MEASUREMENT_PROCEDURE_URL,
  DELETE_SAMPLE_TYPE_URL,
  EDIT_MEASUREMENT_PROCEDURE_URL,
  EDIT_SAMPLE_TYPE_URL,
  EDIT_USER_URL,
  GET_ACTIVE_USERS_URL,
  GET_MEASUREMENT_PROCEDURES_URL,
  GET_SAMPLES_URL,
  GET_SAMPLE_TYPES_URL,
  GET_SAMPLE_URL,
  GET_USERS_URL,
  GET_USER_INFO_URL,
  GET_USER_REQUEST,
  GET_USER_SAMPLES_URL,
  IS_ADMIN_URL,
  REACTIVATE_USER_URL,
  SAVE_SAMPLE_URL,
  VALIDATE_TEST_URL,
} from "./urls/urls";

const username = import.meta.env.VITE_API_USERNAME;
const password = import.meta.env.VITE_API_PASSWORD;

const credentials = `${username}:${password}`;
const encodedCredentials = btoa(credentials);

export const addUserRequest = async (user) => {
  try {
    const response = await fetch(ADD_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    if (data.success) {
      return {
        status: 1,
        data: null,
      };
    }

    if (data.usernameFound) {
      if (data.isActive) {
        return -1;
      } else {
        return -2;
      }
    }

    if (data.phoneFound) {
      return -3;
    }

    if (data.emailFound) {
      return -4;
    }
  } catch (err) {
    return -100;
  }
};

export const reactivateUserRequest = async (username) => {
  try {
    const response = await fetch(REACTIVATE_USER_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    if (data) {
      return {
        status: 2,
        data: null,
      };
    }
  } catch (err) {
    return -100;
  }
};

export const getUserRequest = async (username) => {
  try {
    const response = await fetch(`${GET_USER_REQUEST}${username}`);

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    if (data.found) {
      if (data.isActive) {
        return {
          status: 3,
          data: data.user,
        };
      } else {
        return -5;
      }
    }

    if (!data.found) {
      return -6;
    }
  } catch (err) {
    return -100;
  }
};

export const editUserRequest = async (user) => {
  try {
    const response = await fetch(EDIT_USER_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    if (data.success) {
      return {
        status: 4,
        data: null,
      };
    }

    if (data.phoneFound) {
      return -7;
    }

    if (data.emailFound) {
      return -8;
    }
  } catch (err) {
    return -100;
  }
};

export const deactivateUserRequest = async (username) => {
  try {
    const response = await fetch(`${DEACTIVATE_USER_URL}${username}`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    if (data) {
      return {
        status: 5,
        data: null,
      };
    }
  } catch (err) {
    return -100;
  }
};

export const validateTestRequest = async (testId) => {
  try {
    const response = await fetch(`${VALIDATE_TEST_URL}${testId}`);

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    if (data) {
      return {
        status: 6,
        data: null,
      };
    }

    if (!data) {
      return -9;
    }
  } catch (err) {
    return -100;
  }
};

export const saveSampleRequest = async (sample) => {
  try {
    const response = await fetch(SAVE_SAMPLE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sample),
    });

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();

    if (data.success) {
      return {
        status: 7,
        data: data.sampleInfo,
      };
    }

    if (data.serialNumberExist) {
      return -10;
    }

    if (data.patientNotFound) {
      return -11;
    }

    if (data.testInUse) {
      return -12;
    }
  } catch (err) {
    return -100;
  }
};

/* NON-REQUEST URLS */
export const getActiveUsersRequest = async (role) => {
  try {
    const response = await fetch(`${GET_ACTIVE_USERS_URL}${role}`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return [];
  }
};

export const getUsersRequest = async (role) => {
  try {
    const response = await fetch(`${GET_USERS_URL}${role}`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return [];
  }
};

export const getSamplesRequest = async () => {
  try {
    const response = await fetch(`${GET_SAMPLES_URL}`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return [];
  }
};

export const getUserSamplesRequest = async (username) => {
  try {
    const response = await fetch(`${GET_USER_SAMPLES_URL}${username}`);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return [];
  }
};

export const getSampleRequest = async (serialNumber) => {
  try {
    const response = await fetch(`${GET_SAMPLE_URL}${serialNumber}`);

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    return {
      found: data.success,
      sample: data.sampleInfo,
    };
  } catch (err) {
    return undefined;
  }
};

export const getUserInfoRequest = async (username) => {
  try {
    const response = await fetch(`${GET_USER_INFO_URL}${username}`);

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    return {
      found: data.found,
      user: data.user,
    };
  } catch (err) {
    return undefined;
  }
};

export const addSampleTypeRequest = async (sampleType) => {
  try {
    const response = await fetch(ADD_SAMPLE_TYPE_URL, {
      method: "POST",
      body: JSON.stringify(sampleType),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const addMeasurementProcedureRequest = async (measurementProcedure) => {
  try {
    const response = await fetch(ADD_MEASUREMENT_PROCEDURE_URL, {
      method: "POST",
      body: JSON.stringify(measurementProcedure),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const editSampleTypeRequest = async (oldValue, newValue) => {
  try {
    const response = await fetch(EDIT_SAMPLE_TYPE_URL, {
      method: "PUT",
      body: JSON.stringify({
        oldValue,
        newValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const editMeasurementProcedureRequest = async (oldValue, newValue) => {
  try {
    const response = await fetch(EDIT_MEASUREMENT_PROCEDURE_URL, {
      method: "PUT",
      body: JSON.stringify({
        oldValue,
        newValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const deleteSampleTypeRequest = async (sampleType) => {
  try {
    const response = await fetch(`${DELETE_SAMPLE_TYPE_URL}${sampleType}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const deleteMeasurementProcedureRequest = async (
  measurementProcedure
) => {
  try {
    const response = await fetch(
      `${DELETE_MEASUREMENT_PROCEDURE_URL}${measurementProcedure}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      return undefined;
    }
  } catch (err) {
    return undefined;
  }
};

export const getSampleTypesRequest = async () => {
  try {
    const response = await fetch(`${GET_SAMPLE_TYPES_URL}`);

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return undefined;
  }
};

export const getMeasurementProceduresRequest = async () => {
  try {
    const response = await fetch(`${GET_MEASUREMENT_PROCEDURES_URL}`);

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return undefined;
  }
};
