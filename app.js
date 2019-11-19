var express = require("express");
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser: true, useUnifiedTopology: true});
var app = express();

app.use(require('express-session')({
	secret: 'Tygryszak',
	resave: false,
	saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES =============================================

app.get('/', function (req, res){
	res.render('home')
})

app.get('/secret', function(req, res){
	res.render('secret')
})

// AUTH ROUTES ==========================================
app.get('/register', function (req, res){
	res.render('register')
})
//Handling user sign up
app.post('/register', function (req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function (err, user){
		if(err){
			console.log(err)
			res.render('register')
		} else {
			passport.authenticate('local')(req, res, function(){
				res.redirect('/secret')
			})
		}
	})
})

//Tel express to listen for requests - start server
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});

