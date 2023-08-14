import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  timeout : 2000,
})

export function setClientToken(token){
  axios.defaults.headers.common = {
    'Authorization' : `"Bearer ${token}"`
  }
}