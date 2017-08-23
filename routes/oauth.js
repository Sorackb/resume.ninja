var express = require('express');
var configuration = require('../models/configuration');
var router = express.Router();

router.get('/linkedin/callback', function(req, res, next) {
  console.log(JSON.stringify(req.query));

  configuration.oauthLinkedinCallback(req.query.code, req.query.state).then(function(response) {
    res.redirect('/');
  }).catch(console.error);
});

module.exports = router;
