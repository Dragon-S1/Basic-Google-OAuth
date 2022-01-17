const mangoose = require('mongoose')

const Schema = mangoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
	},
	googleID: {
		type: String,
	},
	image: {
		type: String,
	},
})

const User = mangoose.model('user', userSchema)
module.exports = User