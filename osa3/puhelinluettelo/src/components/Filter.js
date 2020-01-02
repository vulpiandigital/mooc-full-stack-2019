import React from 'react'

const Filter = ({ handleFilterNames, filterValue, clearFilter }) => (
	<form><p>Filter shown with <input onChange={handleFilterNames} value={filterValue} id="filterNames" /> <button type="reset" onClick={clearFilter}>Clear</button></p></form>
)

export default Filter