const router = require('express').Router()

//check if a user session is going on or not
const authCheck = (req,res,next) => {
	if(!req.user){
		res.redirect('/auth/google')
	} else {
		next()
	}
}

//profile route with authCheck middleware
router.get('/profile', authCheck, (req,res) => {
	res.render('profile', { user: req.user })
})

module.exports = router