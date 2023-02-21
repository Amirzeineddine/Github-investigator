import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = "http://192.168.1.120:5000/api/users/";
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
    try {
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      // Error saving data
    }
  }
  return response.data;
};

// Login user
const login = async (userData: UserLogData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    try {
      console.log(response.data, "DATAAAAAAAAA");
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      // Error saving data
    }
  }
  return response.data;
};

// Logout  user

const logout = () => {
  try {
    AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

const authService = {
  register,
  logout,
  login,
};
export default authService;
