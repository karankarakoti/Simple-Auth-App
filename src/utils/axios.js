import axios from "axios";

import { apiConfig } from "config";

const Axios = axios.create({
  baseURL: apiConfig.API_URL,
  withCredentials: true
});

export default Axios;