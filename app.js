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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES ---------------------------------------------
app.get('/', function (req, res){
	res.render('home')
})

app.get('/secret', function(req, res){
	res.render('secret')
})


//Tel express to listen for requests - start server
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});

