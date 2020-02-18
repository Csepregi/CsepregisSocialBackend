const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json())

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

app.get('/posts', (req, res) => {
	res.json(posts)
})

app.get('/posts/:id', (req, res) => {
	const id = Number(req.params.id)
	const post = posts.find(post => post.id === id)
	if (post) {
		res.json(post)
	} else {
		res.status(404).end()
	}
})

app.post('/posts', (req, res) => {
	const body = req.body

	if (!body.name) {
		return res.status(400).json({
			error: 'content missing'
		})
	}

	const post = {
		name: body.name,
		description: body.description,
		location: body.location,
		date: new Date(),
		id: generateId(),
	}

	posts = posts.concat(post)
	console.log(typeof body.description)
	console.log(post)
	res.json(post)
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