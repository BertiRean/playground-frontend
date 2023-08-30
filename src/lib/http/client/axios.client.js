import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  timeout : 2000,
})

export function setClientToken(token){
  axios.defaults.headers.common = {
    'Authorization' : `Bearer ${token}`
  }
}