const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

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