import axios from "axios";

const get = async (userId) => {
  const url =  process.env.NEXT_PUBLIC_API_URL + `/worldbuilding/${userId}`

  return await axios.get(url)
  .then(response => {
    return response.data.worldbuilding
  })
}

const update = async (userId, worldbuildingText) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/worldbuilding/${userId}`

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