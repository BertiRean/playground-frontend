import axios from "axios"
import { BASE_URL } from "src/lib/http/client/axios.client";

const getChar = async (characterId) => {
  const url = BASE_URL + `/character/${characterId}`

  return await axios.get(url).then(response => {
    return response.data.data
  })
  .catch(error => {
    return null
  })
}

const create = async (character, userId) => {
  const url = BASE_URL + '/character/create'
  
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
  const url = BASE_URL +  `/character/${characterId}`

  await axios.put(
    url,
    character
  )
  .then(response => {return response.data})
  .catch(error => {})
}

const getUserChars = async(userId) => {
  const url = BASE_URL + `/character/list/${userId}`

  return await axios.get(
    url,
  )
  .then(response => {return response.data})
}

const deleteChar = async(userId, characterId) => {
  const url = BASE_URL + `/character/${characterId}`

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

const generateDialogue = async(token = "", characterId, aiModel = "openai", number_of_lines = 3, additional_context="") => {
  const url = BASE_URL + '/dialogue/generate'
  return await axios.get(
    url, 
    {
      params : {
        model : aiModel,
        character_id : characterId,
        additional_context : additional_context,
        number_of_lines : number_of_lines,
      },
      headers : {
        Authorization : `Bearer ${token}`
      }
    }
  )
}

const refinateLine = async(model="", line="", liked=false) => {

  const url = BASE_URL + "/dialogue/finetuning";

  return await axios.post(url, null, {
    params : {
      model,
      line,
      liked
    },
    headers : {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error(error);
  })
}

const getVoices = async(token = "") => {
  
  const url = BASE_URL + "/voice/speakers";
  return await axios.get(url, {
    headers : {
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(response => {
    return response.data.speakers;
  })
}

const genVoiceForLine = async(voice_id, text) => {
  const url = BASE_URL + '/voice/audio';

  return await axios.get(
    url,
    {
      params : {
        voice_id : voice_id,
        dialogue : text,
        voice_speed : 1,
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
    console.error(error);
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
    genVoiceForLine : genVoiceForLine,
    refinateLine : refinateLine
}
