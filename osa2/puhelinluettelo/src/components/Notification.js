import React from 'react'

const Notification = ({ message, clearNotification }) => {
	if ( message.content.length > 0 ) {
		return (
			<>
				<div className={message.type}>{message.content}</div>
				<script>
					(() => { clearNotification() }())
				</script>
			</>
		)
	} else {
		return <></>
	}
}

export default Notification