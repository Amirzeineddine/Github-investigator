import axios from "axios";

const API_URL = "https://api.github.com/";

interface Token {
  token: string;
}

// Get all user

const Getusers = async (page: number, token: Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}users?since=${page}&per_page=20`,
    config
  );

  return response.data;
};

// Get all user

const SearchUsers = async (search: string, token: Token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}search/users?q=${search}`,
    config
  );

  return response.data;
};

const usersService = {
  Getusers,
  SearchUsers,
};
export default usersService;
