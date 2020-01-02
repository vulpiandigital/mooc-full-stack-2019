const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
	console.log('ERROR: Give the password as the second argument')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0-zgsd9.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length === 3 ) {
	Person.find({}).then(result => {
		console.log('Phonebook:')
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
} else if ( process.argv.length > 3 ) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})
	person.save().then(() => {
		console.log(`Added ${process.argv[3]}, number ${process.argv[4]}`)
		mongoose.connection.close()
	})
} else {
	mongoose.connection.close()
}