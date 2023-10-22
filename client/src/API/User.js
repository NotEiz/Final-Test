import axios from "axios";
import { API } from "./const";

export const RegUser = async (user) => {
  const response = await axios.post(`/register`, user);
  return response.data;
};

export const loginUser = async (values) => {
  const response = await axios.post(`/login`, values);
  return response.data;
};
