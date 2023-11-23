import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("acces_token");
  if (accessToken) {
    config.headers["Authorization"] = accessToken;
  }

  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.config.url !== "/auth/login" && error.response.status === 401) {
      const response = await axiosInstance.post("/auth/token", {
        refreshToken: localStorage.getItem("refresh_token"),
      });
      const { accesToken, refreshToken } = response.data;
      localStorage.setItem("acces_token", accesToken);
      localStorage.setItem("refresh_token", refreshToken);
      originalRequest.headers = {
        Authorization: accesToken,
      };
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
