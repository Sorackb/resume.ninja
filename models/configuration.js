var fs             = require('fs');
var configuration  = {};
var configurations = {};
var promise;

const DIR = './configuration/';

configuration.get = _get;

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

function _resolve(host) {
  host = host.indexOf('localhost') === 0 ? 'www.lucassouza.ninja' : host;

  return configurations[host];
}

module.exports = configuration;