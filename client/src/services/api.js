import axios from "axios";

const API = axios.create({
  baseURL: "https://momentum-dsa-tracker-production-cd9e.up.railway.app",
});

export default API;