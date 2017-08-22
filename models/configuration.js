var Linkedin = require('node-linkedin');
var fs = require('fs');
var configuration = {};
var configurations = {};
var store = {};
var promise;

const DIR = './configuration/';

configuration.get = _get;
configuration.getToken = _getToken;
configuration.oauthLinkedinCallback = _oauthLinkedinCallback;

_init();

function _init() {
  promise = _read();

  store.linkedin = {};
  store.linkedin.resources = ['r_basicprofile'];
  store.linkedin.apis = {};
  store.linkedin.results = {};
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
    var callbackURL;
    var data;
    var api;

    data = _resolve(host);
    callbackURL = protocol + '://' + host + '/oauth/linkedin/callback';

    api = Linkedin(data.linkedin.clientId, data.linkedin.secret, callbackURL)
    store.linkedin.apis[data.key] = api;
    resolve(api.auth.authorize(linkedin.resources));
  });
}

function _oauthLinkedinCallback(host, code, state) {
  return new Promise(function(resolve, reject) {
    var data = _resolve(host);
    var api = store.linkedin.apis[data.key];

    api.auth.getAccessToken(code, state, function(err, result) {
      var linkedin;

      if (err) {
        return reject(err);
      }

      store.linkedin.results[data.key] = result;

      linkedin = api.init(result.access_token);

      linkedin.people.me(function(err, $in) {
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