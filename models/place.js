const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const placeSchema = new mongoose.Schema({
	name: String,
	description: String,
	location: String,
	important: Boolean,
})

placeSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Place', placeSchema)  