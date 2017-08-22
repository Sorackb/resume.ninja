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
      configurations[file.replace(/\.json$/, '')] = JSON.parse(fs.readFileSync(DIR + file, 'utf8'));
    });

    resolve(configurations);
  });
}

function _get(host) {
  return new Promise(function(resolve, reject) {
    host = host.indexOf('localhost') === 0 ? 'resume-ninja.herokuapp.com' : host;

    promise.then(resolve.bind(null, configurations[host]));
  });
}

function _getToken(protocol, host) {
  return new Promise(function(resolve, reject) {
    var data;
    var clientId;
    var secret;
    
    host = host.indexOf('localhost') === 0 ? 'resume-ninja.herokuapp.com' : host;
    data = configurations[host];
    clientId = process.env[data.key + '_LI_CLIENTE_ID'];
    secret = process.env[data.key + '_LI_SECRET'];

    linkedin.apis[data.key] = Linkedin(clientId, secret, protocol + '://' + host + '/oauth/linkedin/callback');
    linkedin.apis[data.key].auth.authorize(resolve, linkedin.resources);
  });
}

function _oauthLinkedinCallback(code, state) {
  new Promise(function(resolve, reject) {
    linkedin.apis['LUCASSOUZA'].auth.getAccessToken(code, state, function(err, results) {
      if (err) {
        return reject(err);
      }

      linkedin.results['LUCASSOUZA'] = results;
      resolve(results);
    });
  });
}

module.exports = configuration;