import axios from "../api/axiosConfig";

// Send verification request (with images, ID, etc.)
export const requestVerification = async (formData) => {
  return axios.post("http://localhost/webdev/backend/api/requestVerification.php", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// Get current verification status of a user
export const getVerification = async (username) => {
  return axios.get(`http://localhost/webdev/backend/api/getVerification.php?username=${username}`
  );
};
