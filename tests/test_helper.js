const Place = require('../models/place')

const initialPlaces = [
	{
		name: 'USA',
		description: 'friends',
		location: 'Austin',
	},
	{
		name: 'Chile',
		description: 'amigos',
		location: 'Andes',
	},
]

const nonExistingId = async () => {
	const note = new Place({ name: 'Argentina', description: 'ice', location: 'Buenos' })
	await note.save()
	await note.remove()

	return note._id.toString()
}

const placesInDb = async () => {
	const places = await Place.find({})
	return places.map(place => place.toJSON())
}

module.exports = {
	initialPlaces, nonExistingId, placesInDb
}