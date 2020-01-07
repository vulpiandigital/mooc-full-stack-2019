const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	let likes = 0
	blogs.forEach(blog => likes = likes + blog.likes)
	return likes
}

const favoriteBlog = (blogs) => {
	let mostFaves = Math.max(...blogs.map(blog => blog.likes)), mostFaved = blogs.find(blog => blog.likes === mostFaves)
	return { title: mostFaved.title, author: mostFaved.author, likes: mostFaves }
}

const mostBlogs = (blogs) => {
	let blogsPerAuthor = _.countBy(blogs, (blog) => blog.author), theAuthor = _.maxBy(_.keys(blogsPerAuthor), (author) => blogsPerAuthor[author]), theBlogs = blogsPerAuthor[theAuthor]
	return { author: theAuthor, blogs: theBlogs }
}

const mostLikes = (blogs) => {
	let groupedByAuthor = _.groupBy(blogs, (blog) => blog.author), authorsAndLikes = []
	_.forEach(groupedByAuthor, (blogs, author) => {
		let likes = _.reduce(blogs, (sum, blog) => sum + blog.likes, 0)
		authorsAndLikes.push({ author: author, likes: likes })	
	})
	return _.maxBy(authorsAndLikes, (obj) => obj.likes)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }