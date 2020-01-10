import React, { useState } from 'react'

const Blog = ({ blog, user, handleLikeBlog, handleRemoveBlog }) => {
	const [expanded, setExpanded] = useState(false)
	const blogStyle = {
		padding: 10,
		border: 'dotted #666',
		borderWidth: 1,
		marginBottom: 5,
		display: expanded ? '' : 'none'
	}
	return (
		<li className="blog">
			<p className="expander" onClick={() => setExpanded(!expanded) }><em>{blog.title}</em> by {blog.author}</p>
			<div style={blogStyle}>
				<em>{blog.title}</em><br />
				{blog.author}<br />
				<a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a><br />
				{blog.likes} likes <button onClick={() => { handleLikeBlog(blog.id) } }>Like</button><br />
				Added by {blog.user.name} ({blog.user.username})<br />
				{
					blog.user.username === user.username &&
					<button onClick={() => { handleRemoveBlog(blog.id, blog.title, blog.author) } }>Remove blog</button>
				}
			</div>
		</li>
	)
}

export default Blog