import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
	title: 'Just a Simple Blog',
	author: 'John Doe',
	likes: 333,
	user: {
		name: "Test User",
		username: "test"
	}
}

const user = {
	username: 'test',
	token: 'nekot',
	name: 'Test User'
}


test('Initially a blog item in the blog list only Shows the blogs title and author ("Just a Simple Blog [by] John Doe")', () => {
	const component = render(
		<Blog blog={blog} user={user} />
	)
	const expander = component.container.querySelector('p.expander')
	expect(expander).toHaveTextContent('Just a Simple Blog by John Doe')
})

test('Clicking the blog title and author in the blog list reveals full entry data', () => {

	localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
	
	const component = render(
		<Blog blog={blog} user={user} />
	)
	const expander = component.container.querySelector('p.expander')
	fireEvent.click(expander)
	
	const fullEntry = component.container.querySelector('p.expander + div')
	expect(fullEntry).toHaveStyle('padding: 10px')
})
