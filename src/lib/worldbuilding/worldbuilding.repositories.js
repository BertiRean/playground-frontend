import axios from "axios";

const get = async (userId) => {
  const url = `http://127.0.0.1:8000/worldbuilding/${userId}`

  return await axios.get(url)
  .then(response => {
    return response.data.worldbuilding
  })
}

export const WorldBuildingRepository =
{
  get : get
}