import axios from "axios";
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: false,
  responseType: "arraybuffer",
});

http.interceptors.request.use(
  (config) => {
    config.headers["Accept"] = "application/x-protobuf";
    config.headers["content-type"] = "application/x-protobuf";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const data = response.data;
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { http as request };
