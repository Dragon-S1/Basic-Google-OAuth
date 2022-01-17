const router = require('express').Router()
const passport = require('passport')

// logout user
router.get('/logout', (req,res) => {
	req.logout()
	res.redirect('/')
})

// setup passport authenticator to handle login request
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}))

// get the user data from the passport
router.get('/redirect', passport.authenticate('google'), (req,res) => {
	res.redirect('/user/profile')
})

module.exports = router