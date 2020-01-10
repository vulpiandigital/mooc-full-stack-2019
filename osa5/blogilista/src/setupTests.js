/* Cleanup no longer needs a manual import */
import '@testing-library/jest-dom/extend-expect'

jest.mock('./services/blogs')

let savedItems = {}

const localStorageMock = {
	setItem: (key, item) => {
		savedItems[key] = item
	},
	getItem: (key) => savedItems[key],
	clear: savedItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })