import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASEURL = "https://api.jehad.pro";
// const DEVURL = "http://127.0.0.1:8000";

const axiosClient: AxiosInstance = axios.create({
  baseURL: `${BASEURL}/api`,
});

axiosClient.defaults.headers.get['Accepts'] = 'application/json';
axiosClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axiosClient.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

axiosClient.interceptors.request.use((config: AxiosRequestConfig<never>) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (config.headers !== undefined) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("USER");
      window.location.reload();
    } else if (response?.status === 404) {
      //Show not found
      window.location.href = "/404";
    }

    throw error;
  }
);

export default axiosClient;
