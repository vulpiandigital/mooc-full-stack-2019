require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')
const morgan = require('morgan')
morgan.token('persondata',(req) => {
	if ( req.method === 'POST' ) {
		return JSON.stringify(req.body)
	} else {
		return ''
	}
})
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :persondata'))

app.get('/info', (request, response) => {
	Person.find({}).then(persons => {
		response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
	})
})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons.map(person => person.toJSON()))
	})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if ( person ) {
				response.json(person.toJSON())
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const content = request.body
	const person = {
		number: content.number
	}
	Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
		.then(updatedPerson => {
			response.json(updatedPerson.toJSON())
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const content = request.body

	const person = new Person({
		name: content.name,
		number: content.number
	})
	person
		.save()
		.then(savedPerson => response.json(savedPerson.toJSON()))
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	if ( error.name === 'CastError' && error.kind === 'ObjectId' ) {
		return response.status(400).send({ error: 'Malformed id' })
	} else if ( error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })