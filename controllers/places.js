const placesRouter = require('express').Router()
const Place = require('../models/place')

placesRouter.get('/', async (request, response) => {
	const places = await Place.find({})
	response.json(places.map(place => place.toJSON()))
})

placesRouter.post('/api/places', async (request, response) => {
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


placesRouter.get('/:id', async (request, response) => {
	const place = await Place.findById(request.params.id)
	response.json(place.toJSON())
})

placesRouter.delete('/:id', async (request, response, next) => {
	const id = Number(request.params.id)
	try {
		await Place.findByIdAndRemove(id)
		response.status(204).end()
	} catch (e) {
		next(e)
	}
})

placesRouter.put('/:id', (request, response, next) => {
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

module.exports = placesRouter