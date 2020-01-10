import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
	title: 'Just a Simple Blog',
	author: 'John Doe',
	likes: 333
}

describe('Renders simple blog content', () => {
		
	test('Title', () => {
		const component = render(
			<SimpleBlog blog={blog} />
		)
		expect(component.container).toHaveTextContent('Just a Simple Blog')
	})
	
	test('Author', () => {
		const component = render(
			<SimpleBlog blog={blog} />
		)
		expect(component.container).toHaveTextContent('John Doe')
	})
	
	test('Likes', () => {
		const component = render(
			<SimpleBlog blog={blog} />
		)
		expect(component.container).toHaveTextContent('333')
	})
	
})

test('Clicking the Like button twice calls the event handler twice', () => {
	const evHandler = jest.fn()
	const component = render(
		<SimpleBlog blog={blog} onClick={evHandler} />
	)
	const button = component.container.querySelector('button')
	fireEvent.click(button)
	fireEvent.click(button)
	expect(evHandler.mock.calls.length).toBe(2)
})