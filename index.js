const express = require('express')
const app = express()
const config = require('./utils/config')

const server = http.createServer(app)

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = config.PORT

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})