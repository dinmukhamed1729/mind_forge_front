import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token && token !== 'undefined') {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("Send request use token", token);
        return config;
    },
    (error) => {
        console.log(error.response);
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    response => {

        if (response && response.status === 200 && response.data.access) {
            localStorage.setItem('token', response.data.access);
            console.log("token saved ", response.data.access);
        }
        return response;
    },
    (error) => {
        console.log(error.response);
        return Promise.reject(error);
    }
)
export default api;
