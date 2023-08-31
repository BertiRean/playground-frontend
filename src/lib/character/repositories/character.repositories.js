import axios from "axios"

const getChar = async (characterId) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/character/${characterId}`

  return await axios.get(url).then(response => {
    return response.data.data
  })
  .catch(error => {
    return null
  })
}

const create = async (character, userId) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/character/create'
  
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
  const url = process.env.NEXT_PUBLIC_API_URL +  `/character/${characterId}`

  await axios.put(
    url,
    character
  )
  .then(response => {return response.data})
  .catch(error => {})
}

const getUserChars = async(userId) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/character/list/${userId}`

  return await axios.get(
    url,
  )
  .then(response => {return response.data})
}

const deleteChar = async(userId, characterId) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/character/${characterId}`

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

const generateDialogue = async(token = "", characterId, aiModel = "openai", number_of_lines = 3) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/dialogue/generate'
  return await axios.get(
    url, 
    {
      params : {
        model : "openai",
        character_id : characterId,
        additional_context : "",
        number_of_lines : number_of_lines,
      },
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
  )
}

const getVoices = async(token = "") => {
  
  const url = process.env.NEXT_PUBLIC_API_URL + "/voice/speakers";
  return await axios.get(url, {
    headers : {
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(response => {
    console.log(response.data.speakers)
    return response.data.speakers;
  })
}

const playAudio = async(voice_id, text) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/voice/audio';

  return await axios.get(
    url,
    {
      params : {
        voice_id : voice_id,
        dialogue : text
      },
      headers : {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  })
}

export const CharacterRepository =
{
    getChars : getUserChars,
    getData : getChar,
    create : create,
    update : update,
    delete : deleteChar,
    getDialogue : generateDialogue,
    getVoices : getVoices,
    playDialogue : playAudio
}
