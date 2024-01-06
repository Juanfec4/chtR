import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
const login = (username: string, password: string) => {
  return axios.post(baseUrl + "/auth/login", { username, password });
};

export default { login };
