'use strict';
const nodemailer = require('nodemailer'); 
var formidable = require('formidable');
var express = require('express');
var router = express.Router();
var ensureLoggedIn =  require('connect-ensure-login').ensureLoggedIn
var util = require('util');
var csrf = require('csurf');
var securePin = require('secure-pin');
var fs = require('fs');
var bodyParser = require( 'body-parser' );
var passport = require('passport');
var db = require('../db.js'); 
var bcrypt = require('bcrypt-nodejs');
var securePin = require('secure-pin');
var path = require('path');
var url = require('url'); 
var math = require( 'mathjs' );
var formevents = require( '../functions/forms.js' );


function rounds( err, results ){ 
	if ( err ) throw err;
}
var csrfProtection = csrf({ cookie: true })

var parseForm = bodyParser.urlencoded({ extended: false })

const saltRounds = bcrypt.genSalt( 10, rounds);


//adminfunction
function admin(x, y, j){
	y.query('SELECT user FROM admin WHERE user = ?', [x], function(err, results, fields){
		if(err) throw err;
		if(results.length === 0){
			j.redirect('/404');
		}else{
			var admin = x;
			j.render('upload', {title: 'ADMIN CORNER', admin: admin});
		}
	});
}

router.get('/', function(req, res, next) {
  res.render('index', {title: 'HOTEL SCRIPT'});
});

router.get('/rooms', function(req, res, next) {
  res.render('rooms', {title: 'Reserve Room'});
});

//register get request
router.get('/register',  function(req, res, next) {	
    res.render('register',  { title: 'REGISTRATION'});
});

router.get('/getrooms/:number', function(req, res, next) {
	var number = req.params.number;
	db.query('SELECT number FROM rooms WHERE number = ?', [number], function(err, results, fields){
		if(err) throw err;
		res.send(results);
	});
});


//get admin
router.get('/admin', ensureLoggedIn('/login'), function(req, res, next) {
	//get the category.
	//var currentUser = req.session.passport.user.user_id;
	//admin(currentUser, db, res);
	res.render('upload', {title: 'ADMIN CORNER'});
});

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

//Passport login
passport.serializeUser(function(user_id, done){
  done(null, user_id)
});
        
passport.deserializeUser(function(user_id, done){
  done(null, user_id)
});


//get login
router.get('/login', function(req, res, next) {  
	const flashMessages = res.locals.getMessages( );
	if( flashMessages.error ){
		res.render( 'login', {
			title: 'LOGIN',
			showErrors: true,
			errors: flashMessages.error
		});
	}else{
		res.render('login', { title: 'LOG IN'});
	}
});
/*router.get('/404', function(req, res, next) {
  res.render('404', {title: 'PAGE NOT FOUND', message: 'Ooops  since you got lost somehow but i am here to catch you. see our quick links.'});
});*/
router.get( '*', function ( req, res, next ){
	res.redirect( '/' )
});
module.exports = router;