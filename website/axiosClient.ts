import axios from "axios";
const DevURL = "http://127.0.0.1:8000";
const BASEURL = "https://api.jehad.pro";

// "@babel/core": "~7.20.0",
const axiosClient = axios.create({
  baseURL: `${BASEURL}/api`,
});
axiosClient.defaults.headers.get['Accepts'] = 'application/json';
axiosClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axiosClient.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

export default axiosClient;
