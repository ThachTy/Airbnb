import axios from "axios";

const { TOKEN_CYBERSOFT } = require("../utils/constants");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4MjYiLCJlbWFpbCI6Im1ldGFAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNzAzMDAzNDI2LCJleHAiOjE3MDM2MDgyMjZ9.v6UL224Zdv-3aOjHYbwVnKxlrU1bYSXBW_jpmF3aDJU";

export const http = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    tokenCybersoft: TOKEN_CYBERSOFT,
    token: token,
  },
});
