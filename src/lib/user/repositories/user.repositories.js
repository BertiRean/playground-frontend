import axios from "axios";
import { setClientToken } from "src/lib/http/client/axios.client";

const BASE_URL = "https://docs.playground.com.ar";

const login = async (email, password) => {
  const url = BASE_URL + "/auth/login"
  const userForm = new FormData();
  userForm.append('username', email)
  userForm.append('password', password)

  return await axios.post(
    url,
    userForm,
    {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }
  )
  .then(response => {
    if (response.status == 200){
      setClientToken(response.data.access_token)
      return response.data
    }
  })
}

const signUp = async(name, email, password) => {
  const url = BASE_URL + `/auth/register`
  const user = {
    name : name,
    email : email,
    password : password
  };

  return await axios.post(
    url,
    user,
  ).then(response => {
    if (response.status == 200)
      return response.data
  })
}

export const UserRepository =
{
    login : login,
    signUp : signUp,
}