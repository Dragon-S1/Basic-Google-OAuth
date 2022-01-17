const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')
const dotenv = require('dotenv')

dotenv.config()

// serialize the user
passport.serializeUser((user,done) => {
	done(null, user.id)
})

//deserialize the user
passport.deserializeUser((id,done) => {
	User.findById(id).then(user => {
		done(null, user)
	})
})

// setup strategy
passport.use(new GoogleStrategy({
	callbackURL: '/auth/redirect',
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {

	//add/retrieve the user to/from db
	User.findOne({googleID: profile.id}).then(user => {
		if(!user){
			new User({
				username: profile.displayName,
				googleID: profile.id,
				image: profile._json.picture
			}).save().then(newUser => {
				done(null, newUser)
			})
		} else {
			done(null, user)
		}
	})
}))