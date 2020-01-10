import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'

const user = {
	username: 'test',
	token: 'nekot',
	name: 'Test User'
}

describe('<App />', () => {
	
	test('If no User is logged in (determined by the existance of a button with "name" attribute "login" in the document), blogs are not rendered', async () => {
		const component = render(<App />)
		component.rerender(<App />)
		await waitForElement(() => component.getAllByText('Login'))
		const login = component.container.querySelector('button[name=login]')
		expect(login).toBeInTheDocument()
	})
	
	test('When a User is logged in, blogs are rendered', async () => {
		localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
		const component = render(<App />)
		component.rerender(<App />)
		await waitForElement(() => component.container.querySelector('li.blog'))
		const blogs = component.container.querySelectorAll('li.blog')
		expect(blogs.length).toBe(6)
	})
	
})