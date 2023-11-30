const { default: axios } = require("axios");
const { TOKEN_CYBERSOFT } = require("../utils/constants");

export const http = axios.create({
    baseURL: 'https://airbnbnew.cybersoft.edu.vn/api',
    headers: {
        tokenCybersoft: TOKEN_CYBERSOFT
    }
})  