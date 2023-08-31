import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
axios.defaults.timeout = 30000;


export function setClientToken(token){
  localStorage.setItem('token', token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
