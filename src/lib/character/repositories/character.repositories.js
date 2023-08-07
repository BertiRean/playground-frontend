import axios from "axios";

const getChar = async (characterId) => {
  const url = `/character/${characterId}`

  await axios.get(url).then(response => {
    return response.data
  })
  .catch(error => {
    return {}
  })
}

const create = async (character) => {
  axios.defaults.baseURL = 'http://127.0.0.1:8000';
  const url = '/character/5eb7cf5a86d9755df3a6c593'

  await axios.get(url)
  .then(response => console.log(response))
  .catch(error => {
    console.log(error)
  })
}

const update = async (characterId, character) => {
  const url = `/character/${characterId}`

  await axios.put(
    url,
    character
  )
  .then(response => {return response.data})
  .catch(error => {})
}

const getUserChars = async(userId) => {
  const url = `/character/${userId}`

  await axios.get(
    url,
  )
  .then(response => {return response.data})
  .catch(error => {})
}

export const CharacterRepository =
{
    getChars : getUserChars,
    getData : getChar,
    create : create,
    update : update
}
