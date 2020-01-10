const Blog = require('../models/blog')

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const blogsHaveID = (blogs) => {
	let haveID = 0
	blogs.forEach(blog => { if ( blog.id ) { haveID++ } })
	if ( haveID === blogs.length ) { 
		return true 
	} else { 
		return false 
	}
}

module.exports = { blogsInDb, blogsHaveID }