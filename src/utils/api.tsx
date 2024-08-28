import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 1000,
});
api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";
api.defaults.withCredentials = true;
export default api;
