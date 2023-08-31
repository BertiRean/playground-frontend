import axios from "axios";

const BASE_URL = "https://docs.playground.com.ar";

const get = async (userId) => {
  const url =  BASE_URL + `/worldbuilding/${userId}`

  return await axios.get(url)
  .then(response => {
    return response.data.worldbuilding
  })
}

const update = async (userId, worldbuildingText) => {
  const url = BASE_URL + `/worldbuilding/${userId}`

  return await axios.put(url, {
    text : worldbuildingText
  })
  .then(response => {
    return response.data
  })
}

export const WorldBuildingRepository =
{
  get : get,
  update : update
}