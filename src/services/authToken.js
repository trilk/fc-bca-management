import {axiosInstance} from "./axios";
const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axiosInstance.defaults.headers.common["Authorization"] = token;
  }
  else {
    // Delete auth header
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;