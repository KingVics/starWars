import axios from "axios"

const BaseURL = 'https://swapi.dev/api/'


export const getPeople = async (BaseURL, url) => {
    const res = await axios.get(`${BaseURL}/${url}`)
    return res.data
}