import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

//login
const login = (username: string, password: string) => {
  return axios.post(baseUrl + "/auth/login", { username, password });
};

//Register
const register = (username: string, name: string, password: string, seed: string) => {
  return axios.post(baseUrl + "/auth/register", { username, password, name, seed });
};

export default { login, register };
