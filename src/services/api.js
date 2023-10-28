import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.232.3.49:8084/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;