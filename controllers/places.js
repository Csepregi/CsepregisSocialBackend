const placesRouter = require('express').Router()
const Place = require('../models/place')

placesRouter.get('/', async (request, response) => {
	const places = await Place.find({})
	response.json(places.map(place => place.toJSON()))
})

placesRouter.post('/', async (request, response, next) => {
	const body = request.body

	if (body.name === undefined) {
		return response.status(400).json({ error: 'content missing' })
	}

	const place = new Place({
		name: body.name,
		description: body.description,
		location: body.location,
		date: new Date(),
	})

	try {
		const savedPlace = await place.save()
		response.json(savedPlace.toJSON())
	} catch (exception) {
		next(exception)
	}
})


placesRouter.get('/:id', async (request, response, next) => {
	try {
		const place = await Place.findById(request.params.id)
		if (place) {
			response.json(place.toJSON())
		} else {
			response.status(404).end()
		}
	} catch (exception) {
		next(exception)
	}
})


placesRouter.delete('/:id', async (request, response, next) => {
	try {
		await Place.findByIdAndRemove(request.params.id)
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