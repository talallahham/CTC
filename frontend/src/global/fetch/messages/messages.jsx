import done from "../../../assets/actions/done.png";
import wrong from "../../../assets/actions/wrong.png";

const defaulSuccessMessage = {
  header: "Done!",
  message: "Proccess done successfully!",
  img: done,
};

const defaultErrorMessage = {
  header: "OPPS! Something went wrong!",
  message:
    "Process faild! Something went wrong or some internal errors may happened",
  img: wrong,
};

const defaultLoadingMessage = {
  header: "Loading ...",
  message:
    "Process is loading! Please wait till your requested process is done!",
  img: "",
};

export const fetchErrorMessages = (error, roleName = "") => {
  switch (error) {
    case -1:
      return {
        ...defaultErrorMessage,
        header: `Faild to add ${roleName.toLowerCase()}!`,
        message: `Adding ${roleName.toLowerCase()} process was faild! Because username is already exist for another ${roleName.toLowerCase()}`,
      };

    case -2: {
      return {
        ...defaultErrorMessage,
        header: `Re-activating ${roleName.toLowerCase()} ?`,
        message: `Adding ${roleName.toLowerCase()} process was held! Because username is already exist for deactivated ${roleName.toLowerCase()}, do you want to re-activate the ${roleName.toLowerCase()} with the current information you provided ?`,
      };
    }

    case -3:
      return {
        ...defaultErrorMessage,
        header: `Faild to add ${roleName.toLowerCase()}!`,
        message: `Adding ${roleName.toLowerCase()} process was faild! Because phone is already exist for another ${roleName.toLowerCase()}`,
      };

    case -4:
      return {
        ...defaultErrorMessage,
        header: `Faild to add ${roleName.toLowerCase()}!`,
        message: `Adding ${roleName.toLowerCase()} process was faild! Because email is already exist for another ${roleName.toLowerCase()}`,
      };

    case -5:
      return {
        ...defaultErrorMessage,
        header: `Faild to validate ${roleName.toLowerCase()}!`,
        message: `Validating ${roleName.toLowerCase()} process was faild! Because ${roleName.toLowerCase()} is de-activated! You can re-activate the ${roleName.toLowerCase()} by adding him again with the same old username!`,
      };

    case -6:
      return {
        ...defaultErrorMessage,
        header: `Faild to validate ${roleName.toLowerCase()}!`,
        message: `Validating ${roleName.toLowerCase()} process was faild! Because ${roleName.toLowerCase()} is not found!`,
      };

    case -7:
      return {
        ...defaultErrorMessage,
        header: `Faild to edit ${roleName.toLowerCase()}!`,
        message: `Editing ${roleName.toLowerCase()} process was faild! Because ${roleName.toLowerCase()} phone number exist for another ${roleName.toLowerCase()}!`,
      };

    case -8:
      return {
        ...defaultErrorMessage,
        header: `Faild to edit ${roleName.toLowerCase()}!`,
        message: `Editing ${roleName.toLowerCase()} process was faild! Because ${roleName.toLowerCase()} email exist for another ${roleName.toLowerCase()}!`,
      };

    case -9:
      return {
        ...defaultErrorMessage,
        header: `Faild to validate test!`,
        message: `Validating test process was faild! Because test was not found!`,
      };

    case -10:
      return {
        ...defaultErrorMessage,
        header: `Faild to save sample!`,
        message: `Saving sample process was faild! Because sample serial number already exist!`,
      };

    case -11:
      return {
        ...defaultErrorMessage,
        header: `Faild to save sample!`,
        message: `Saving sample process was faild! Because the patient was not found. Please create the patient first the connect the patient with a sample!`,
      };

    case -12:
      return {
        ...defaultErrorMessage,
        header: `Faild to save sample!`,
        message: `Saving sample process was faild! Because test is connected to another paitent!`,
      };

    case -13:
      return {
        ...defaultErrorMessage,
        header: `BAD CREDENTIALS!`,
        message: `Authentication process was faild! Username or password are incorrect, please try again.`,
      };
  }

  return defaultErrorMessage;
};

export const fetchLoadingMessages = (loading, roleName = "") => {
  switch (loading) {
    case 0:
      return {
        ...defaultLoadingMessage,
        message: `Please wait! Adding ${roleName.toLowerCase()}.`,
      };

    case 1:
      return {
        ...defaultLoadingMessage,
        message: `Please wait! Re-activating ${roleName.toLowerCase()}.`,
      };

    case 2:
      return {
        ...defaultLoadingMessage,
        message: `Please wait! Validating ${roleName.toLowerCase()}.`,
      };

    case 3:
      return {
        ...defaultLoadingMessage,
        message: `Please wait! Editing ${roleName.toLowerCase()}.`,
      };

    case 4:
      return {
        ...defaultLoadingMessage,
        message: `Please wait! De-activating ${roleName.toLowerCase()}.`,
      };

    case 5:
      return {
        ...defaultLoadingMessage,
        message: `Please wait! Validating test.`,
      };

    case 6:
      return {
        ...defaultLoadingMessage,
        message: `Please wait! Validating and saving sample.`,
      };

    case 7:
      return {
        ...defaultLoadingMessage,
        message: `Please wait authenticating user ...`,
      };
  }

  return defaultLoadingMessage;
};

export const successFetchMessages = (success, roleName = "") => {
  switch (success) {
    case 1:
      return {
        ...defaulSuccessMessage,
        header: `${roleName} was added successfully!`,
        message: `Adding ${roleName.toLowerCase()} process was done successfully!`,
      };

    case 2:
      return {
        ...defaulSuccessMessage,
        header: `${roleName} was re-activated successfully!`,
        message: `Re-activating ${roleName.toLowerCase()} process was done successfully!`,
      };

    case 3:
      return {
        ...defaulSuccessMessage,
        header: `${roleName} was found!`,
        message: `Validating ${roleName.toLowerCase()} process was done successfully! Please click on procced to continue.`,
      };

    case 4:
      return {
        ...defaulSuccessMessage,
        header: `${roleName} was edited!`,
        message: `Editing ${roleName.toLowerCase()} process was done successfully!`,
      };

    case 5:
      return {
        ...defaulSuccessMessage,
        header: `${roleName} was de-activated!`,
        message: `De-activating ${roleName.toLowerCase()} process was done successfully!`,
      };

    case 6:
      return {
        ...defaulSuccessMessage,
        header: `Test was found!`,
        message: `Validating test process was done successfully! Please click on procced to continue.`,
      };

    case 7:
      return {
        ...defaulSuccessMessage,
        header: `Sample was found!`,
        message: `Saving sample process was done successfully! Please click on download to download "PDF" sample or close to close the modal.`,
      };

    case 8:
      return {
        ...defaulSuccessMessage,
        header: `Success authentication!`,
        message: `Authentication process was successfully done.`,
      };
  }

  return defaulSuccessMessage;
};
