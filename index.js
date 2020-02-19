const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json())
app.use(express.static('build'))

const url =
	'mongodb+srv://gabor:hangfive2019@csepregis-7katb.mongodb.net/react?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true })

const postSchema = new mongoose.Schema({
	name: String,
	description: String,
	location: String,
	date: Date,
})

postSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})



const Post = mongoose.model('Post', postSchema)

let posts = [
	{
		id: 1,
		name: "HTML is easy",
		description: "hello",
		location: "Budapest",
		date: "2019-05-30T19:20:14.298Z"
	},
	{
		id: 2,
		name: "Browser can execute only Javascript",
		description: "hello",
		location: "Roma",
		date: "2019-05-30T18:39:34.091Z"
	},
	{
		id: 3,
		name: "GET and POST are the most important methods of HTTP protocol",
		description: "hello",
		location: "Matera",
		date: "2019-05-30T19:20:14.298Z"
	}
]

const generateId = () => {
	const maxId = posts.length > 0
		? Math.max(...posts.map(n => n.id))
		: 0
	return maxId + 1
}

app.get('/', (req, res) => {
	res.send('<h1>Hello World</h1>')
})

app.get('/api/posts', (req, res) => {
	Post.find({}).then(posts => {
		res.json(posts.map(post => post.toJSON()))
	})
})

app.get('/api/posts/:id', (req, res) => {
	const id = Number(req.params.id)
	const post = posts.find(post => post.id === id)
	if (post) {
		res.json(post)
	} else {
		res.status(404).end()
	}
})

app.post('/api/posts', (req, res) => {
	const body = req.body

	if (!body.name) {
		return res.status(400).json({
			error: 'content missing'
		})
	}

	const post = new Post({
		name: body.name,
		description: body.description,
		location: body.location,
		date: new Date(),
		id: generateId(),
	})

	post.save().then(savedPost => {
		res.json(savedPost.toJSON())
	})
})

app.delete('/posts/:id', (req, res) => {
	const id = Number(req.params.id)
	posts = posts.filter(post => post.id !== id)

	res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})