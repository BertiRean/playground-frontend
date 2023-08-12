import axios from "axios";


const login = async (email, password) => {
  const url = 'http://127.0.0.1:8000/auth/login'
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
      return response.data
    }
  })
}

export const UserRepository =
{
    login : login,
}