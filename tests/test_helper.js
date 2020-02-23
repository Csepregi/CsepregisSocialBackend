const Place = require('../models/place')
const User = require('../models/user')

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

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialPlaces,
	nonExistingId,
	placesInDb,
	usersInDb
}