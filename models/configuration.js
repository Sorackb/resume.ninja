var Linkedin = require('node-linkedin');
var fs = require('fs');
var configuration = {};
var configurations = {};
var linkedin = {};
var promise;

const DIR = './configuration/';

configuration.get = _get;
configuration.getToken = _getToken;
configuration.oauthLinkedinCallback = _oauthLinkedinCallback;

_init();

function _init() {
  promise = _read();

  linkedin = {};
  linkedin.resources = ['r_basicprofile', 'r_fullprofile'];
  linkedin.apis = {};
  linkedin.results = {};
}

function _read() {
  return new Promise(function(resolve, reject) {
    fs.readdirSync(DIR).forEach(function (file) {
      var json = JSON.parse(fs.readFileSync(DIR + file, 'utf8'));

      if (!json.linkedin) {
        json.linkedin = {};
      }

      json.linkedin.clientId = process.env[json.key + '_LI_CLIENTE_ID'];
      json.linkedin.secret = process.env[json.key + '_LI_SECRET'];
      configurations[file.replace(/\.json$/, '')] = json;
    });

    resolve(configurations);
  });
}

function _get(host) {
  return new Promise(function(resolve, reject) {
    promise.then(function() {
      resolve(_resolve(host));
    });
  });
}

function _getToken(protocol, host) {
  return new Promise(function(resolve, reject) {
    var data;
    var callbackURL;

    data = _resolve(host);
    callbackURL = protocol + '://' + host + '/oauth/linkedin/callback';

    linkedin.apis[data.key] = Linkedin(data.linkedin.clientId, data.linkedin.secret, callbackURL);
    resolve(linkedin.apis[data.key].auth.authorize(linkedin.resources));
  });
}

function _oauthLinkedinCallback(code, state) {
  new Promise(function(resolve, reject) {
    var data = _resolve(host);

    linkedin.apis[data.key].auth.getAccessToken(code, state, function(err, results) {
      if (err) {
        return reject(err);
      }

      linkedin.results[data.key] = results;
      resolve(results);
    });
  });
}

function _resolve(host) {
  host = host.indexOf('localhost') === 0 ? 'resume-ninja.herokuapp.com' : host;

  return configurations[host];
}

module.exports = configuration;