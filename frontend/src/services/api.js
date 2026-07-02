import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API}/api/employees`,
});

export default API;