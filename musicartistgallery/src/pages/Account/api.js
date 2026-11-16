import axios from "axios";

export const regUser = async (formData) => {
  return axios.post("http://localhost/webdev/backend/api/registration.php", formData);
};

export const loginUser = async (formData) => {
  return axios.post("http://localhost/webdev/backend/api/login.php", formData);
};

export const adminLogin = async (formData) => {
  return axios.post(
    "http://localhost/webdev/backend/api/adminlogin.php",
    JSON.stringify(formData),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const getVerification = async (username) => {
  return axios.get(`http://localhost/webdev/backend/api/getVerification.php?username=${username}`);
};

export const requestVerification = async (data) => {
  return axios.post("http://localhost/webdev/backend/api/requestVerification.php", data);
};


