import axios from 'axios'
const baseUrl = '/api/persons'

const getNumbers = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const addNumber = (newPerson) => {
	const request = axios.post(baseUrl, newPerson)
	return request.then(response => response.data)
}

const updateNumber = (id, newPerson) => {
	const request = axios.put(`${baseUrl}/${id}`, newPerson)
	return request.then(response => response.data)
}

const removeNumber = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

export default { getNumbers, addNumber, updateNumber, removeNumber }