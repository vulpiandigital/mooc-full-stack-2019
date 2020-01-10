import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password }) => {
	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<table>
					<tbody>
						<tr>
							<td>Username</td>
							<td><input { ...username.field } /></td>
						</tr>
						<tr>
							<td>Password</td>
							<td><input { ...password.field } /></td>
						</tr>
					</tbody>
				</table>
				<button type="submit" name="login">Login</button>
			</form>
		</div>
	)
}

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	username: PropTypes.object.isRequired,
	password: PropTypes.object.isRequired
}

export default LoginForm