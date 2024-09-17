import axios from 'axios';

// Tạo một instance của axios với các cấu hình cơ bản
const request = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hàm GET
export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

// Hàm POST
export const post = async (path, data, options = {}) => {
    const response = await request.post(path, data, options);
    return response.data;
};

// Hàm PUT
export const put = async (path, data, options = {}) => {
    const response = await request.put(path, data, options);
    return response.data;
};

// Hàm DELETE
export const del = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
};

export default request;
