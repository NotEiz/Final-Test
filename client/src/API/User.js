import axios from "axios";
import { API } from "./const";

export const RegUser = async (user) => {
  const response = await axios.post(`${API}/register`, user);
  return response.data;
};

export const loginUser = async (values) => {
  const response = await axios.post(`${API}/login`, values);
  return response.data;
};
