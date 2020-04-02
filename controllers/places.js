const placesRouter = require('express').Router()
const Place = require('../models/place')
const User = require('../models/user')
//const Comment = require("../models/comment")
const multer = require('multer');
// const upload = multer({ 'dest': 'uploads/' })
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary');

const storage = multer.diskStorage({
	filename: function (req, file, callback) {
		callback(null, Date.now() + file.originalname);
	}
});

const imageFilter = function (req, file, cb) {
	// accept image files only
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
		return cb(new Error("Only image files are accepted!"), false);
	}
	cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });


cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})


placesRouter.get('/', async (request, response) => {
	const places = await Place
		.find({})
		.populate('user', { username: 1, name: 1 })
	//.populate("comments", { comment: 1 })
	response.json(places.map(place => place.toJSON()))
})

placesRouter.post('/:id/comments', async (request, response, next) => {
	const body = request.body
	const id = request.params.id
	const place = await Place.findById(id)
	const comments = [...place.comments, body.comment]

	const updatedPlace = await Place.findByIdAndUpdate(id, { comments }, { new: true }).populate('user', { places: 0 })
	response.json(updatedPlace.toJSON())

});



placesRouter.post('/', upload.single("image"), async (request, response, next) => {
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

		// cloudinary.v2.uploader.upload(request.file.path, function (err, result) {
		// 	if (err) {
		// 		request.json(err.message)
		// 	}
		// 	body.image = result.secure_url;
		// 	body.imageId = result.public_id;

		// })

		body.image = [];

		let image = await cloudinary.v2.uploader.upload(request.file.path);
		body.images.push({
			image: image.secure_url,
			public_id: image.public_id
		});


		// body.images = [];
		// console.log(body.files)
		// for (const file of request.file) {
		// 	console.log('Path', file.path);
		// 	let image = await cloudinary.v2.uploader.upload(file.path);
		// 	body.images.push({
		// 		url: image.secure_url,
		// 		public_id: image.public_id
		// 	});
		// }


		const place = new Place({
			name: body.name,
			description: body.description,
			location: body.location,
			date: new Date(),
			likes: body.likes || 0,
			image: body.image,
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
		location: body.location,
		likes: body.likes
	}

	Place.findByIdAndUpdate(request.params.id, place, { new: true })
		.then(updatedNote => {
			response.json(updatedNote.toJSON())
		})
		.catch(error => next(error))
})

// placesRouter.post("/:id/comments", async (request, response, next) => {
// 	const body = request.body
// 	try {
// 		const decodedToken = jwt.verify(request.token, process.env.SECRET)
// 		if (!request.token || !decodedToken.id) {
// 			return response.status(401).json({ error: "Token missing or invalid" })
// 		}

// 		if (!body.comment) {
// 			response.status(400).end()
// 		}

// 		const comment = new Comment({
// 			comment: body.comment,
// 			place: request.params.id
// 		})

// 		const savedComment = await comment.save()
// 		const place = await Place.findOne({ _id: request.params.id })
// 		place.comments = place.comments.concat(savedComment.id)
// 		await place.save()

// 		response.status(201).json(savedComment)
// 	} catch (exception) {
// 		next(exception)
// 	}
// })


module.exports = placesRouter