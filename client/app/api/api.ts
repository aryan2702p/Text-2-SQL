import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    console.log("api called");
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("response", response);

    return response;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};

export const executeQuery = async (query: string, tableName: string) => {
  try {
    const response = await api.post("/query", { query, tableName });
    return response;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};
