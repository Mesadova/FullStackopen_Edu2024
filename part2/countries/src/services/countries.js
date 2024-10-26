import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'http://api.weatherapi.com/v1'
const apiKey = import.meta.env.VITE_SOME_KEY


const showAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather = (location) => {
    const request = axios.get(`${weatherUrl}/current.json?key=${apiKey}&q=${location}`)
    return request.then(response => response.data)
}

export default { showAll, getWeather }