import React from 'react'

const Notification = ({ message, type, clearNotification }) => {
	if ( message === null ) { return null }
	return (
		<>
			<div className={type}>{message}</div>
			<script>(() => { clearNotification() }())</script>
		</>
	)
}

export default Notification