const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')

const Place = require('./models/place')

app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

app.use(requestLogger)


app.use(express.static('build'))

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

app.post('/api/places', async (request, response) => {
	const body = request.body

	if (body.name === undefined) {
		return response.status(400).json({ error: 'content missing' })
	}

	const place = new Place({
		name: body.name,
		description: body.description,
		location: body.location,
		important: body.important || false,
		date: new Date(),
	})

	const savedNote = await place.save()
	response.json(savedNote.toJSON())
})

app.get('/api/places', async (request, response) => {
	const places = await Place.find({})
	response.json(places.map(place => place.toJSON()))
})

app.get('/api/places/:id', async (request, response) => {
	const place = await Place.findById(request.params.id)
	response.json(place.toJSON())
})

app.delete('/api/places/:id', async (request, response, next) => {
	const id = Number(request.params.id)
	try {
		await Note.findByIdAndRemove(id)
		response.status(204).end()
	} catch (e) {
		next(e)
	}
})

app.put('/api/places/:id', (request, response, next) => {
	const body = request.body

	const place = {
		name: body.name,
		description: body.description,
		location: body.location
	}

	Place.findByIdAndUpdate(request.params.id, place, { new: true })
		.then(updatedNote => {
			response.json(updatedNote.toJSON())
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})