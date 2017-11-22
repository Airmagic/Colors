var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('/secret');
});

/* Get login page */
router.get('/login', function(req,res, next){
	res.render('login');
});

/* Get signup page */
router.get('/signup', function(req,res, next){
	res.render('signup');
});
	
/* Post to login */
router.post('/login', passport.authenticate('local-login',{
	successRedirect: '/secret',
	failureRedirect: '/login',
	failureFlash: '/true'
}));

/* POST to signup */
router.post('/signup', passport.authenticate('local-signup',{
	successRedirect:'/secret',
	failureRedirect:'/signup',
	failureFlash: true
}));

/* Get secret page */
router.get('/secret', isLoggedIn, function(req, res, next) {
	
	var user = req.user.local;
	
	res.render('secret',{
		username : user.username,
	});
});

/* get logout page */
router.get('/logout', function(req,res, next){
	/* makes passport middleware adds logout function to req object */
	req.logout();
	/* redirect to home page */
	res.redirect('/');
})

/* checking if user is logged in */
function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
		next();
	}
	else{
		res.render('/login');
	}
}


module.exports = router;
