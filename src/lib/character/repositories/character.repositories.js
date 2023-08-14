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

const create = async (character, userId) => {
  const url = 'http://127.0.0.1:8000/character/create'
  
  let formData = new FormData();
  formData.append('name', character.name);
  formData.append('description', character.description);
  formData.append('userId', userId);
  formData.append('traits', character.traits.toString());
  formData.append('image', character.image);

  return await axios.post(url, formData, {
    headers : {
      'Content-Type' : 'multipart/form-data'
    }
  })
  .then(response => {
    return response.data
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
  const url = `http://127.0.0.1:8000/character/list/${userId}`

  return await axios.get(
    url,
  )
  .then(response => {return response.data})
}

const deleteChar = async(userId, characterId) => {
  const url = `http://127.0.0.1:8000/character/${characterId}`

  return await axios.delete(url, {
    data : {
      userId : userId
    }
  })
  .then(response => {
    if (response.status === 200){
      return response.data
    }
  })
}

export const CharacterRepository =
{
    getChars : getUserChars,
    getData : getChar,
    create : create,
    update : update,
    delete : deleteChar,
}
