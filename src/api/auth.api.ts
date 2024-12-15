import axios from "../axiosConfig";
import { LoginType } from "../types/auth.type";

export const loginApi = (body: LoginType) => {
  return axios.post("http://localhost:4000/auth/login", body);
};
