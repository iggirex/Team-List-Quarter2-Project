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

router.get('/chat', function(req, res, next) {
  res.render('chat')
})

router.get('/profile', auth.ensureAuthenticated,  function(req, res, next) {
  // query.getAllUsers()
  // .then(function(users) {
  //   res.render('profile', {users: users})
  // })
  console.log(req.user)
  res.render('profile', {user: req.user})
})

router.get('/register', auth.ensureAuthenticated, function(req, res, next) {
  console.log('this is the req.user.id in /register :', req.user.id)
  console.log('this is the req.user[0].id in /register :', req.user[0].id)

  query.doesIDExist(req.user.id, req.user[0].id)
  .then((user)=>{
    if (!user.user_name){
      console.log("inside ")
      res.render('register')
    } else {
      console.log('user.user_name already exists')
      res.redirect('/chat')
    }
  })
  .catch((err)=>{
    console.log(err)
  })
  //
  // console.log("this is req.user: ", req.user)
  // if (req.user.user_name === undefined) {
  //   res.render('register')
  // } else {
  //   res.redirect('/chat')
  // }
});

router.post('/register',   function(req, res, next) {
  console.log('this is req.user from the post:', req.user)
  query.insertAdditionalInfo(req.user.id, req.body.user_name, req.body.genre, req.body.instrument, req.body.influence, req.body.bio)
  .then(() =>{
    res.redirect('/chat');
  })
})

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
