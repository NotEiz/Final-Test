import axios from "axios";
import { API } from "./const";

export const FetchAnswers = async (id) => {
  try {
    const response = await axios.get(`${API}/Answers/${id}/Answers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching answers:", error);
  }
};

export const CreateNewAnswer = async (Answer) => {
  const response = await axios.post(`${API}/Answers`, Answer);
  return response.data;
};

export const FetchAnswer = async (id) => {
  try {
    const response = await axios.get(`${API}/Answers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching answer:", error);
  }
};

export const UpdateAnswer = async (id, Answer) => {
  const response = await axios.put(`${API}/Answers/${id}`, Answer);
  return response.data;
};

export const DeleteAnswer = async (id) => {
  const response = await axios.delete(`${API}/Answers/${id}`);
  return response.data;
};
