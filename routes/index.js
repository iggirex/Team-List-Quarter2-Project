var express = require('express');
var router = express.Router();

var query = require('../db/query')

var passport = require('../passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
  res.render('pages/chat')
})

router.get('/register', function(req, res, next) {
  res.render('pages/register')
})

module.exports = router;
