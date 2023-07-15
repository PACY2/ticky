import axios from "axios";

let baseURL = "http://localhost:3001/api";

const api = axios.create({
  withCredentials: true,
  baseURL,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response?.status === 401) {
      try {
        await axios({
          withCredentials: true,
          url: `${baseURL}/refresh`,
          method: "POST",
        });

        return axios(error.response.config);
      } catch (err) { }
    }

    return Promise.reject(error);
  }
);

export default api;
