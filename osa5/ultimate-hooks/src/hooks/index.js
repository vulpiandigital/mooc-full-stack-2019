import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (e) => {
    	setValue(e.target.value)
  	}

	return { type, value, onChange }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(() => {
	  axios.get(baseUrl)
	  	.then(response => {
		  setResources(resources.concat(response.data))
	  	})
  }, [])

  const create = async resource => {
	  axios.post(baseUrl, resource)
	  	.then(response => { setResources(resources.concat(response.data)) })
		.catch(error => { console.log(error) })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
} 



/*import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}*/
