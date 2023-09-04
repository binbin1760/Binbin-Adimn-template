import axios from "axios";
import { getUserInfo } from "./getUserInfo";
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
});

// http.interceptors.request.use(config=> {
//     if(getUserInfo()){
//         config.header
//     }
// });

export { http as request };
