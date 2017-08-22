var express = require('express');
var configuration = require('../models/configuration');
var router = express.Router();

router.get('/resource', function(req, res, next) {
  configuration.get(req.headers.host).then(function(response) {
    res.jsonp(response);
  }).catch(console.error);
});

router.get('/token', function(req, res, next) {
  configuration.getToken(req.protocol, req.headers.host).then(function(response) {
    res.redirect(response);
  }).catch(console.error);
});

module.exports = router;
