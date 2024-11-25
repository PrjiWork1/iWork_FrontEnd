import axios from "axios";


const axiosApi = axios.create({
    baseURL: "http://localhost:5202/api/",
});

axiosApi.interceptors.request.use(
    config => {
        config.headers.Authorization = "Bearer " + sessionStorage.getItem("token_iWork")
        return config
    },
    error => {
        return Promise.reject(error);
    }
)

export default axiosApi;