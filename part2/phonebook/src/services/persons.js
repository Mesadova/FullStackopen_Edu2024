import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => {
        return response.data
    })
}

const showAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const deletePerson = (personIdDelete) => {
    const personUrlDelete = `${baseUrl}/${personIdDelete}`
    const request = axios.delete(personUrlDelete)
        return request.then(response => {
            return response.data
        })
}
export default {create, showAll, deletePerson}