const blogs = [
	{
		id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		user: {
			username: "test",
			name: "Test User",
			id:	"5e148c9f275cfaa89c49b845"
		}
  	},
	{
		id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		user: {
			username: "test",
			name: "Test User",
			id:	"5e148c9f275cfaa89c49b845"
		}
	},
	{
		id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		user: {
			username: "test",
			name: "Test User",
			id:	"5e148c9f275cfaa89c49b845"
		}
	},
	{
		id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
		likes: 10,
		user: {
			username: "test",
			name: "Test User",
			id:	"5e148c9f275cfaa89c49b845"
		}
	},
	{
		id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		user: {
			username: "test",
			name: "Test User",
			id:	"5e148c9f275cfaa89c49b845"
		}
	},
  	{
    	id: "5a422bc61b54a676234d17fc",
    	title: "Type wars",
    	author: "Robert C. Martin",
    	url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    	likes: 2,
		user: {
			username: "test",
			name: "Test User",
			id:	"5e148c9f275cfaa89c49b845"
		}
 	}  
]

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	return Promise.resolve(blogs)
}

export default { setToken, getAll }