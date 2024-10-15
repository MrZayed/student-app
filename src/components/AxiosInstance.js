import axios from 'axios';

const API_URL = 'http://localhost:8080/api/students'; // Your Spring Boot backend URL

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
