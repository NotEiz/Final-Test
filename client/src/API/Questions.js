import axios from "axios";

export const FetchQuestions = async (asc) => {
  try {
    const response = await axios.get(`/Questions?&asc=${asc}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

export const FetchQuestion = async (id) => {
  try {
    const response = await axios.get(`/Questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
  }
};

export const updateQuestion = async (id, question) => {
  try {
    const response = await axios.put(`/Questions/${id}`, question);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
  }
};

export const DeleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`/Questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
  }
};

export const CreateNewQuestion = async (Question) => {
  try {
    const response = await axios.post(`/Questions`, Question);
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
  }
};
