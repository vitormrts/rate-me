import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3333",
});

const get = ({ url, headers }) => instance.get(url, { headers });

const post = ({ url, headers, data }) => instance.post(url, data, { headers });

const api = {
  get,
  instance,
  post,
};

export default api;
