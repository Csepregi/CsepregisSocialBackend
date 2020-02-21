const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Place = require('../models/place')



beforeEach(async () => {
	await Place.deleteMany({})

	let placeObject = new Place(helper.initialPlaces[0])
	await placeObject.save()

	placeObject = new Place(helper.initialPlaces[1])
	await placeObject.save()
})

test('places are returned as json', async () => {
	await api
		.get('/api/places')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
	const response = await api.get('/api/notes')

	expect(response.body.length).toBe(helper.initialPlaces.length)
})

test('the first note is about HTTP methods', async () => {
	const response = await api.get('/api/places')

	expect(response.body[0].name).toBe('USA')
})

test('all places are returned', async () => {
	const response = await api.get('/api/places')

	expect(response.body.length).toBe(initialPlaces.length)
})

test('a specific place is within the returned places', async () => {
	const response = await api.get('/api/places')

	const contents = response.body.map(r => r.name)

	expect(contents).toContain(
		'Chile'
	)
})

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

test('place without content is not added', async () => {
	const newPlace = {
		name: "Cannelloni",
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


afterAll(() => {
	mongoose.connection.close()
})