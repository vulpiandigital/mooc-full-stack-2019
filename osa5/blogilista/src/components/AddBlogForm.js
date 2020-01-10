import React from 'react'
import PropTypes from 'prop-types'

const AddBlogForm = ({ handleAddBlog, title, author, url }) => {
	return (
		<>
			<h2>Add a new blog</h2>
			<form onSubmit={handleAddBlog}>
				<table>
					<tbody>
						<tr>
							<td>Title:</td>
							<td><input { ...title.field } /></td>
						</tr>
						<tr>
							<td>Author:</td>
							<td><input { ...author.field } /></td>
						</tr>
						<tr>
							<td>Url:</td>
							<td><input { ...url.field } /></td>
						</tr>
					</tbody>
				</table>
				<button type="submit">Add</button>
			</form>
		</>
	)
}

AddBlogForm.propTypes = {
	handleAddBlog: PropTypes.func.isRequired,
	title: PropTypes.object.isRequired,
	author: PropTypes.object.isRequired,
	url: PropTypes.object.isRequired
}

export default AddBlogForm