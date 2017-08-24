var Linkedin       = require('node-linkedin')(process.env.LINKEDIN_CLIENTE_ID, process.env.LINKEDIN_CLIENTE_ID);
var fs             = require('fs');
var configuration  = {};
var configurations = {};
var promise;

const DIR = './configuration/';

configuration.get                   = _get;
configuration.getToken              = _getToken;
configuration.oauthLinkedinCallback = _oauthLinkedinCallback;

_init();

function _init() {
  promise = _read();
}

function _read() {
  return new Promise(function(resolve, reject) {
    fs.readdirSync(DIR).forEach(function(file) {
      var json = JSON.parse(fs.readFileSync(DIR + file, 'utf8'));

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
    url = protocol + '://' + host + '/oauth/linkedin/callback';
    Linkedin.setCallback(url);
    resolve(Linkedin.auth.authorize(['r_basicprofile']));
  });
}

function _oauthLinkedinCallback(params) {
  return new Promise(function(resolve, reject) {
    Linkedin.auth.getAccessToken(params.code, params.state, function(err, result) {
      var linkedin;

      if (err) {
        return reject(err);
      }
      
      linkedin = Linkedin.init(result.access_token);

      linkedin.people.me(function(err, $in) {
        // TODO persist
        console.log(JSON.stringify($in));
      });

      resolve(result);
    });
  });
}

function _resolve(host) {
  host = host.indexOf('localhost') === 0 ? 'resume-ninja.herokuapp.com' : host;

  return configurations[host];
}

module.exports = configuration;