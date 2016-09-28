var express = require('express');
var router = express.Router();
var auth = require('../passport.js')
var db = require('../db/query.js')
var dotenv = require('dotenv').config()
var twilio = require('twilio');
var client = new twilio.RestClient(process.env.accountSid, process.env.authToken);

//var query = require('../db/query')
//var passport = require('../passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
  res.render('chat')
})

router.get('/profile', function(req, res, next) {
  res.render('profile')
})

router.get('/register', function(req, res, next) {
  res.render('register')
});

router.get('/edit', function(req, res, next) {
  res.render('editProfile')
})

router.get('/profile', auth.ensureAuthenticated, function(req, res) {
    res.json(req.body);
});

router.get('/login', function(req, res) {
    res.render('login', {
        user: req.user
    });
});

router.get('/auth/google', auth.passport.authenticate('google', {
    scope: [
        'profile', 'email',
    ],
    accessType: 'offline',
    approvalPrompt: 'force'
}));

router.get('/auth/google/callback',
    auth.passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/login'
      }
    )
);

router.get('/twilio', function(){
  client.messages.create({
    body: 'YO WAZZUP',
    to: '+15206645798',  // Text this number
    from: '+15052070206' // From a valid Twilio number
  }, function(err, message) {
    console.log(err);
  });
})

module.exports = router;
