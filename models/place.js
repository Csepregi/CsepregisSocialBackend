const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const placeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: String,
	location: String,
	likes: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [String],
	images: [{ image: String, imageId: String }],
	// comments: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Comment"
	// 	}
	// ]
})

placeSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Place', placeSchema)  