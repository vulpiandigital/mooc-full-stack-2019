import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import numbersService from './services/numbers.js'

let notificationTimeOut

const App = () => {
	const [ persons, setPersons ] = useState([])
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filterValue, setFilterValue ] = useState('')
	const [ errorMessage, setErrorMessage ] = useState({ content: '', type: '' })
	const filterNames = filterValue.length > 0 ? true : false
	const handleNameChange = (e) => {
		setNewName(e.target.value)
	}
	const handleNumberChange = (e) => {
		setNewNumber(e.target.value)
	}
	const handleFilterNames = (e) => {
		setFilterValue(e.target.value)
	}
	const clearFilter = (e) => {
		setFilterValue('')
	}
	const addName = (e) => {
		e.preventDefault()
		if ( newName.length > 0 ) {
			const personObject = {
				name: newName,
				number: newNumber
			}
			let nameExists = false
			persons.forEach(person => {
				if ( person.name === newName ) { 
					nameExists = true
					const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
					if ( confirmUpdate ) {
						numbersService
							.updateNumber(person.id, personObject)
							.then(response => {
								numbersService
									.getNumbers()
									.then(initialNumbers => {
										setPersons(initialNumbers)
									})
								setErrorMessage({ content: `Updated ${personObject.name}`, type: 'success'})
							})
							.catch(error => {
								setErrorMessage({ content: `${error.response.data.error}`, type: 'error'})
							})
					}
				}
			})
			if ( !nameExists ) {
				numbersService
					.addNumber(personObject)
					.then(returnedPerson => {
						setPersons(persons.concat(returnedPerson))
						setErrorMessage({ content: `Added ${personObject.name}`, type: 'success'})
					})
					.catch(error => {
						setErrorMessage({ content: `${error.response.data.error}`, type: 'error'})
					})
			}
			setNewName('')
			setNewNumber('')
		}
	}
	const requestRemoveName = (id) => {
		const person = persons.find(p => p.id === id), confirmRemove = window.confirm(`Delete ${person.name}?`)
		if ( confirmRemove ) {
			numbersService
				.removeNumber(id)
				.then(response => {
					numbersService
						.getNumbers()
						.then(initialNumbers => {
							setPersons(initialNumbers)
						})
					setErrorMessage({ content: `Removed ${person.name}`, type: 'success'})
				})
				.catch(error => {
					setErrorMessage({ content: `${person.name} has already been removed from the server`, type: 'error'})
				})
		}
	}
	const clearNotification = () => {
		clearTimeout(notificationTimeOut)
		notificationTimeOut = setTimeout(() => {
			setErrorMessage({ content: '', type: '' })
		}, 4000)
	}
	useEffect(() => {
		numbersService
			.getNumbers()
			.then(initialNumbers => {
				setPersons(initialNumbers)
			})
	}, [])
	return (
		<div>
			<h1>Phonebook</h1>

			<Notification message={errorMessage} clearNotification={clearNotification} />

			<Filter handleFilterNames={handleFilterNames} filterNames={filterNames} clearFilter={clearFilter} />

			<h2>Add an entry</h2>
			<PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />

			<h2>Numbers</h2>
			<Persons persons={persons} filterNames={filterNames} filterValue={filterValue} requestRemoveName={requestRemoveName} />
		</div>
	)
}

export default App