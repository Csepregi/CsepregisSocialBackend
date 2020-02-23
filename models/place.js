const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const placeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	location: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

placeSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Place', placeSchema)  