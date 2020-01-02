import React from 'react'

const Persons = ({ persons, filterNames, filterValue, requestRemoveName }) => {
	const rows = () => {
		let searchFor = new RegExp(filterValue,'i'), peopleToShow = filterNames ? persons.filter(person => person.name.search(searchFor)>= 0 || person.number.search(searchFor) >= 0) : persons
		if ( persons.length > 0 ) {
			return (
				peopleToShow.map(person => <li key={person.name}>{person.name} {person.number} <button onClick={() => requestRemoveName(person.id) }>Delete</button></li> )
			)
		} else {
			return (
				<p>The phonebook is empty.</p>
			)
		}
	}
			
	return (
		<ul>
			{ filterNames && 
			<li><strong>Showing results matching "{filterValue}"</strong></li>
			}
			{rows()}
		</ul>
	)
}

export default Persons