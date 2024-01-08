import axios from "axios";
import { store } from "../redux/store";

const baseUrl = import.meta.env.VITE_API_URL;

//login
const login = (username: string, password: string) => {
  return axios.post(baseUrl + "/auth/login", { username, password });
};

//Register
const register = (username: string, name: string, password: string, seed: string) => {
  return axios.post(baseUrl + "/auth/register", { username, password, name, seed });
};

//Update user
const updateUser = (newName: string, newSeed: string) => {
  const { userToken } = store.getState().user;
  return axios.patch(
    baseUrl + "/auth/user",
    { newName, newSeed },
    { headers: { authorization: userToken } }
  );
};

export default { login, register, updateUser };
