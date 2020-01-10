import React, { useState, useEffect } from 'react'
import { useField } from './hooks'
import './App.css'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import SimpleBlog from './components/SimpleBlog'

let notificationTimeOut

const App = () => {
	const [blogs, setBlogs] = useState([])
	const username = useField('text')
	const password = useField('password')
	const title = useField('title')
	const author = useField('author')
	const url = useField('url')
	const [errorMessage, setErrorMessage] = useState({ message: null, type: null })
	const [user, setUser] = useState(null)
	const getBlogs = async () => {
		const theblogs = await blogService.getAll()
		setBlogs(theblogs)
	}

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
		if ( loggedUserJSON ) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
			getBlogs()
		}
	}, [])

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const user = await loginService.login({ username: username.field.value, password: password.field.value })
			window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			getBlogs()
		} catch(exception) {
			setErrorMessage({ message: 'Invalid username/password', type: 'error' })
		}
	}

	const handleLogout = () => {
		setUser(null)
		window.localStorage.removeItem('loggedBloglistAppUser')
	}

	const handleAddBlog = async (e) => {
		e.preventDefault()
		try {
			const newBlog = {
				title: title.field.value,
				author: author.field.value,
				url: url.field.value
			}
			let submission = await blogService.create(newBlog)
			submission.user = {
				id: submission.user,
				username: user.username,
				name: user.name
			}
			setBlogs(blogs.concat(submission))
			title.reset()
			author.reset()
			url.reset()
			setErrorMessage({ message: `Added blog ${title.field.value} by ${author.field.value}`, type: 'success' })
		} catch(exception) {
			setErrorMessage({ message: exception.response.data.error, type: 'error' })
		}
	}

	const handleLikeBlog = async (id) => {
		try {
			const blog = blogs.find(b => b.id === id)
			const updateBlog = { ...blog, likes: blog.likes + 1 }
			await blogService.update(id, updateBlog)
			setBlogs(blogs.map(blog => {
				if ( blog.id === id ) { blog.likes++ }
				return blog
			}))
		} catch(exception) {
			setErrorMessage({ message: exception.response.data.error, type: 'error' })
		}
	}

	const handleRemoveBlog = async (id, title, author) => {
		const confirmRemove = window.confirm(`Are you sure you want to remove blog ${title} by ${author}?`)
		if ( confirmRemove ) {
			try {
				await blogService.remove(id)
				setBlogs(blogs.filter(blog => blog.id !== id))
				setErrorMessage({ message: `Removed blog ${title} by ${author}`, type: 'success' })
			} catch(exception) {
				setErrorMessage({ message: exception.response.data.error, type: 'error' })
			}
		}
	}

	const clearNotification = () => {
		clearTimeout(notificationTimeOut)
		notificationTimeOut = setTimeout(() => {
			setErrorMessage({ message: null, type: null })
		}, 5000)
	}

	const rows = () => blogs.map(blog =>
		<Blog key={blog.id} blog={blog} user={user} handleLikeBlog={handleLikeBlog} handleRemoveBlog={handleRemoveBlog} />
	)

	return (
		<div>
			<h1>Blogs</h1>

			<Notification message={errorMessage.message} type={errorMessage.type} clearNotification={clearNotification} />

			{ user === null ?
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					password={password}
				/>
				:
				<div>
					<p><strong>{user.name}</strong> logged in <button type="button" onClick={handleLogout}>Logout</button></p>
					<Togglable buttonLabel="Add a blog">
						<AddBlogForm
							handleAddBlog={handleAddBlog}
							title={title}
							author={author}
							url={url}
						/>
					</Togglable>
					<ul>
						{rows()}
					</ul>
				</div>
			}
		</div>
	)
}

export default App