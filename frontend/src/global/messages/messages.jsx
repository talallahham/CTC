export const inputErrorMessages = (error) => {
  switch (error) {
    case 0:
      return "Please select a user role!";

    case 1:
      return "Username must not be empty or include any spaces!";

    case 2:
      return "Password must not be empty";

    case 3:
      return "Name must not be empty";

    case 4:
      return "Please enter a vaild email!";

    case 5:
      return "Phone must not be empty and must be only numbers";

    case 6:
      return "Please select a gender!";

    case 7:
      return "Please select a date of birth!";

    case 8:
      return "Test order number must not be empty or include any spaces";

    case 9:
      return "Please select a test type!";

    case 10:
      return "Patient username must not be empty or include any spaces!";

    case 11:
      return "Sample serial number must not be empty!";

    case 12:
      return "Please select a sample type!";

    case 13:
      return "Please select if the sample revised or not!";

    case 14:
      return "Please select a requester for the sample!";

    case 15:
      return "Please select a tester for the sample!";

    case 16:
      return "Please select a measurement procedure for this sample!";
  }
};
