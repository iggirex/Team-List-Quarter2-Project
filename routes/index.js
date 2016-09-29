var express = require('express');
var router = express.Router();
var auth = require('../passport.js')
var query = require('../db/query.js')
var dotenv = require('dotenv').config()
var twilio = require('twilio');
var client = new twilio.RestClient(process.env.accountSid, process.env.authToken);

//var query = require('../db/query')
//var passport = require('../passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', auth.ensureAuthenticated,  function(req, res, next) {
  res.render('chat', {user: req.user})
})

// router.get('/profile', auth.ensureAuthenticated,  function(req, res, next) {
//   console.log(req.user)
//   res.render('profile', {user: req.user})
// })

router.get('/register', auth.ensureAuthenticated, function(req, res, next) {
  console.log("this is our req.user", req.user)
  console.log('this is our req.user.id', req.user.id)
  query.getAllUsersByIdAndGoogleProfileId(req.user)
  .then((userId)=>{
    if(!userId.user_name){
      res.render('register')
    } else {
      res.redirect('/chat')
    }
  })
  // res.render('register')
});

router.post('/register',   function(req, res, next) {
  query.insertAdditionalInfo(req.user, req.body.user_name, req.body.genre, req.body.instrument, req.body.influence, req.body.bio)
  .then(() =>{
    res.redirect('/chat');
  })
})

router.get('/edit', auth.ensureAuthenticated, function(req, res, next) {
  //console.log(req.user)
  res.render('editProfile', {user:req.user})
})

router.post('/edit', function(req, res, next) {
  query.editProfileById(req.user, req.body.user_name, req.body.genre, req.body.instrument, req.body.influence, req.body.bio)
  .then(()=>{
    res.redirect('/chat')
  })
})


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
        successRedirect: '/register',
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
