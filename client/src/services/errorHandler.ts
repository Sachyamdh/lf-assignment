import axios from "axios";

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.log(error);
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          console.error("Bad Request: The request is invalid.");
          break;
        case 401:
          console.error("Unauthorized: Please log in.");
          break;
        case 403:
          console.error("Forbidden: You don't have permission.");
          break;
        case 404:
          console.error("Not Found: The resource could not be found.");
          break;
        case 500:
          console.error(
            "Internal Server Error: Something went wrong on the server."
          );
          break;
        default:
          console.error(`An error occurred: ${status}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network Error: No response received from server.");
    } else {
      // Something else triggered the error
      console.error("Error setting up the request:", error.message);
    }
  } else {
    console.error("Unexpected Error:", error);
  }
};

export default handleError;
