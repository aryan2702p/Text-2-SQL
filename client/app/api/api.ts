import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
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
    throw error; 
  }
};

export const getUserTables = async () => {
  try {
    const response = await api.get("user/tables");
    return response;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

export const executeQuery = async (query: string, tableName: string) => {
  try {
    const response = await api.post("/query", { query, tableName });
    return response;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};


export const getTableData = async (tableName: string) => {
  try {
    const response = await api.post("attributes/table",{tableName});
    return response;
  } catch (error) {
    console.error(error);
    throw error; 
  }

};

export const login = async (email: string, password: string) => {

  try{
    const response = await api.post("auth/login", { email, password });
    return response;

  }catch(error){
    console.error(error);
    throw error;
  }
};

export const signup = async (name: string, email: string, password: string) => {
  try{
    const response = await api.post("auth/signup", { name, email, password });
    return response;
  }catch(error){
    console.error(error);
    throw error;
  }
};


export const logout = async () => {
  try{
    const response = await api.get("auth/logout");
    return response;
  }catch(error){
    console.error(error);
    throw error;
  }
}


export const getAllTables = async () => {
  try{
    const response = await api.get("admin/tables");
    return response;
  }catch(error){
    console.error(error);
    throw error;
  }
}


export const getAllUsers = async () => {
  try{
    const response = await api.get("admin/users");
    return response;
  }catch(error){
    console.error(error);
    throw error;
  }
}

