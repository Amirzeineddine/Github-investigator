import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";
interface UserRegData {
  email: string;
  password: string;
  username: string;
}

interface UserLogData {
  email: string;
  password: string;
}
// Register user
const register = async (userRegData: UserRegData) => {
  const response = await axios.post(API_URL, userRegData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData: UserLogData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout  user

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};
export default authService;
