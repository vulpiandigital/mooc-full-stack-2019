const requestLogger = (req, res, next) => {
	console.log('Method:', req.method)
	console.log('Path:', req.path)
	console.log('Body:', req.body)
	console.log('---')
	next()
}

const tokenExtractor = (req, res, next) => {
	const auth = req.get('authorization')
	if ( auth && auth.toLowerCase().startsWith('bearer ')) {
		req.token = auth.substring(7)
	} else {
		req.token = null
	}
	next()
}

const unknownEndPoint = (req, res) => {
	res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
	if ( error.name === 'CastError' && error.kind === 'ObjectId' ) {
		return res.status(400).send({ error: 'Malformed id' })
	} else if ( error.name === 'ValidationError' ) {
		return res.status(400).json({ error: error.message })
	} else if ( error.name === 'JsonWebTokenError' ) {
		return res.status(401).json({ error: 'Invalid token' })
	}
	
	next(error)
}

module.exports = { requestLogger, tokenExtractor, unknownEndPoint, errorHandler }