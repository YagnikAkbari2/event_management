
import axios from "axios";
import { tokens } from "../commonjs/common"
export const BASE_URL_ECOM = process.env.NEXT_PUBLIC_BASE_URL_ECOM || `https://ecom.mkart.dev/api/v1`;

// initialize axios
const api = axios.create({
    baseURL: BASE_URL_ECOM,
    headers: {
        'Authorization': 'Bearer ',
        'Content-Type': 'application/json'
    },
});

export default api;
