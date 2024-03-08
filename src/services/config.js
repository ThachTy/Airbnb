import axios from "axios";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { TOKEN_CYBERSOFT } from "../utils/constants/index";

const token = getUserFromLocalStorage()?.token && null;
export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    tokenCybersoft: TOKEN_CYBERSOFT,
  },
});
// Thêm một bộ đón chặn request
http.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    const account = getUserFromLocalStorage();
    if (account.token)
      config.headers = { ...config.headers, token: account.token };
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
http.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  }
);

export default http;
