const express = require('express');
const authRoutes = require('./routes/auth-route')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const userRoutes = require('./routes/user-route')
const dotenv = require('dotenv')

// setup express app
const app = express();

// set view engine
app.set('view engine', 'ejs')

// config .env file
dotenv.config()

// add cookie-session middleware
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: ['temp_key']
}))

// initialise passport.js and session
app.use(passport.initialize())
app.use(passport.session())

// connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, () => {
	console.log('Connected to Database')
})

// routers
app.use('/auth', authRoutes)
app.use('/user', userRoutes)

// root route
app.get('/', (req,res) => {
	res.render('home', {user: req.user})
})

// set up listener port for express server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on port ${process.env.PORT || 3000}.....`)
})