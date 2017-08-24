var express = require('express');
var configuration = require('../models/configuration');
var router = express.Router();

router.get('/linkedin/callback', function(req, res, next) {
  configuration.oauthLinkedinCallback(req.query).then(function(response) {
    res.redirect('/');
  }).catch(console.error);
});

module.exports = router;
