const placesRouter = require('express').Router()
const Place = require('../models/place')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


placesRouter.get('/', async (request, response) => {
	const places = await Place
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(places.map(place => place.toJSON()))
})

placesRouter.post('/', async (request, response, next) => {
	const body = request.body

	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		}

		const user = await User.findById(decodedToken.id)

		if (body.name === undefined) {
			return response.status(400).json({ error: 'content missing' })
		}

		const place = new Place({
			name: body.name,
			description: body.description,
			location: body.location,
			date: new Date(),
			user: user._id
		})

		const savedPlace = await place.save()
		user.places = user.places.concat(savedPlace._id)
		await user.save()
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
	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!decodedToken.id || !request.token) {
		return response.status(401).json({ error: "token missing or invalid" })
	}

	try {
		const place = await Place.findById(request.params.id)
		if (place.user.toString() === decodedToken.id.toString()) {
			await place.remove()
			response.status(204).end()
		} else {
			response.status(401).end()
		}
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