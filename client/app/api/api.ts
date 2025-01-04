import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });
  

export const uploadFile = (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        console.log("api called");
        const response =  api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response;
    } catch (error) {
        console.error(error);
    }
};

export const executeQuery = (query: string, tableName: string) => {
    try {
        const response = api.post('/query', { query, tableName });
        return response;
    } catch (error) {
        console.error(error);
    }
}