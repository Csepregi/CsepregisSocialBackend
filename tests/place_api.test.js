const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Place = require('../models/place')



beforeEach(async () => {
	await Place.deleteMany({})

	let placeObject = helper.initialPlaces
		.map(place => new Place(place))
	const promiseArray = placeObject.map(place => place.save())
	await Promise.all(promiseArray)
})

describe('when there is initially some notes saved', () => {
	test('places are returned as json', async () => {
		await api
			.get('/api/places')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
	test('all places are returned', async () => {
		const response = await api.get('/api/places')

		expect(response.body.length).toBe(initialPlaces.length)
	})

	test('the first note is about HTTP methods', async () => {
		const response = await api.get('/api/places')

		expect(response.body[0].name).toBe('USA')
	})
})

describe('viewing a specific place', () => {
	test('a specific place is within the returned places', async () => {
		const response = await api.get('/api/places')
		const contents = response.body.map(r => r.name)
		expect(contents).toContain(
			'Chile'
		)
	})
})

describe('addition of a new place', () => {
	test('a valid place can be added ', async () => {
		const newPlace = {
			name: "Nun mullá",
			description: "baba",
			location: "Napli"
		}

		await api
			.post('/api/places')
			.send(newPlace)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const placesAtEnd = await helper.placesInDb()
		expect(placesAtEnd.length).toBe(helper.initialPlaces.length + 1)

		const contents = placesAtEnd.map(n => n.name)
		expect(contents).toContain(
			'Nun mullá'
		)
	})

	test('place without name is not added', async () => {
		const newPlace = {
			description: "Dolce",
			location: "Trapani"
		}
		await api
			.post('/api/places')
			.send(newPlace)
			.expect(400)

		const placesAtEnd = await helper.notesInDb()

		expect(placesAtEnd.length).toBe(helper.initialPlaces.length)
	})
})

describe('deleteion of a place', () => {
	test('a place can be deleted', async () => {
		const placesAtStart = await helper.placesInDb()
		const placeToDelete = placesAtStart[0]

		await api
			.delete(`/api/places/${placeToDelete.id}`)
			.expect(204)

		const placesAtEnd = await helper.notesInDb()

		expect(placesAtEnd.length).toBe(
			helper.initialPlaces.length - 1
		)

		const contents = placesAtEnd.map(r => r.name)

		expect(contents).not.toContain(placeToDelete.name)
	})
})

afterAll(() => {
	mongoose.connection.close()
})