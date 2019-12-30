import React from 'react'

const PersonForm = ({ addName, handleNameChange, handleNumberChange, newName, newNumber }) => (
	<form onSubmit={addName}>
		<div>name: <input onChange={handleNameChange} value={newName} /></div>
		<div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
		<div><button type="submit">Add</button></div>
	</form>
)

export default PersonForm