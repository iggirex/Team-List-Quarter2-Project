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

//Get Video/Chat Page
router.get('/chat', auth.ensureAuthenticated,  function(req, res, next) {
  query.getAllUsersByIdAndGoogleProfileId(req.user)
  .then ((userdata) => {
    res.render('chat', {user: userdata})
  })
})

//Register New Users
router.get('/register', auth.ensureAuthenticated, function(req, res, next) {
  query.getAllUsersByIdAndGoogleProfileId(req.user)
  .then((userId)=>{
    if(!userId.user_name){
      res.render('register')
    } else {
      res.redirect('/chat')
    }
  })
});

router.post('/register',   function(req, res, next) {
  query.insertAdditionalInfo(req.user, req.body.user_name, req.body.genre, req.body.instrument, req.body.influence, req.body.bio)
  .then(() =>{
    res.redirect('/chat');
  })
})

//Edit Existing Profile
router.get('/edit', auth.ensureAuthenticated, function(req, res, next) {
  query.getAllUsersByIdAndGoogleProfileId(req.user)
  .then ((userdata) => {
    res.render('editProfile', {user: userdata})
  })
})

router.post('/edit', function(req, res, next) {
  query.editProfileById(req.user, req.body.user_name, req.body.genre, req.body.instrument, req.body.influence, req.body.bio)
  .then(()=>{
    res.redirect('/chat')
  })
})

//Delete Profile
router.post('/delete', auth.ensureAuthenticated, function(req, res, next) {
  query.deleteProfileById(req.user)
  .then(() =>{
    res.redirect('/')
  })
})

//Get Admin Page
router.get('/admin', auth.ensureAuthenticated, function(req, res, next) {
  query.getAllUsersByIdAndGoogleProfileId(req.user)
  .then((userdata)=>{
    if(userdata.admin === true){
      query.getAllUsers()
      .then((allusers)=>{
        res.render('admin', {users: allusers})
      })
    } else{
      res.redirect('/chat')
    }
  })
})

//Add an Admin
router.post('/addAdmin/:id', auth.ensureAuthenticated, function(req, res, next) {
    console.log(req.params.id);
  query.addAdmin(req.params.id)
  .then(() =>{
    res.redirect('/admin')
  })
})

//Google OAuth
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
