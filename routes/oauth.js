var express = require('express');
var configuration = require('../models/configuration');
var router = express.Router();

router.get('/linkedin/callback', function(req, res, next) {
  configuration.oauthLinkedinCallback(req.query.code, req.query.state).then(res.send).catch(console.error);
});

module.exports = router;
