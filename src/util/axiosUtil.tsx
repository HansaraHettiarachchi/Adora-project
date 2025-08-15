import axios from "axios";

export const baseURL = "http://localhost:8080/";
export const fullUrl = baseURL + "gym-backend-ant-v2";

const axiosInstance = axios.create({
    baseURL: fullUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        !token && "";

        config.headers.Authorization = token && `Bearer ${token}` || "";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
