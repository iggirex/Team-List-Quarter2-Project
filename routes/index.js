var express = require('express');
var router = express.Router();
var auth = require('../passport.js')
var db = require('../db/query.js')

//var query = require('../db/query')
//var passport = require('../passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
  res.render('chat')
})

router.get('/register', function(req, res, next) {
  res.render('register')
});

router.get('/edit', function(req res, next) {
  res.render('edit')
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

module.exports = router;
