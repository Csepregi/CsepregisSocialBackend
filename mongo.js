const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const url =
	`mongodb+srv://fullstack:Hangfive2019@cluster0-ostce.mongodb.net/note-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
	content: 'Browser can execute only Javascript',
	date: new Date(),
	important: true,
})

note.save().then(response => {
	console.log('note saved!');
	mongoose.connection.close();
})