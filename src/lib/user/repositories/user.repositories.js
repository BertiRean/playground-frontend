import axios from "axios";
import { setClientToken } from "src/lib/http/client/axios.client";
import { BASE_URL } from "src/lib/http/client/axios.client";

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

const update = async(user) => {
  const url = BASE_URL + `/user/update`

  let formData = new FormData();
  formData.append('userId', user.id);
  formData.append('name', user.name);
  formData.append('photo', user.photo);

  return await axios.put(
    url,
    formData,
    {
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
    }
  )
  .then(response => {
    return response.data
  })
}

export const UserRepository =
{
    login : login,
    signUp : signUp,
    update : update,
}