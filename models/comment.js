var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	comment: String,
	place: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Place"
	}
});

commentSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


module.exports = mongoose.model("Comment", commentSchema)